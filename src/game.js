// third
import React from 'react'
import styled from 'styled-components'

// local
import Board from './board.js'

// styles
const SuperWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const GameInfo = styled.div`
    margin-left: 20px;
`

const Status = styled.div``

const MoveTable = styled.table`
    cursor: pointer;
    font-size: 10px;
    color: black;
    border: 1px solid black;
    background-color: ${({current}) => {
        return (current) ? "black": "white"}};

    &:hover{
        background-color: ${({current}) => {
            return (current) ? "rgb(105, 105, 105)": "rgb(173, 173, 173)"}};
    }

    td{
        width: 10px;
        height: 10px;
        text-align: center;
        background-color: white;
        border: 1px solid black;
    }
`

export default class Game extends React.Component {
    // class constructor
    constructor(props){
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            ascending: true,
        }
    }

    // callback function called when a click is performed on a square
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1)
        const squares = history[history.length-1].squares.slice()

        // ignore click when game over or square already filled
        if (gameOver(squares)[0] || squares[i]){
            return;
        }

        // edit the square content
        squares[i] = (this.state.xIsNext ? 'X' : 'O')
        
        // change state
        history.push({squares})
        this.setState({
            history: history,
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length-1
        })
    }

    // callback function called to perform history movement
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0,
        })
    }

    // sort button callback
    handleSort(){
        this.setState({
            ascending: !this.state.ascending
        })
    }

    // render history
    renderRow(nRow, step){
        const cols = []
        for(let i = 0; i < 3; i++) {
            cols.push(<td key={i}>{step.squares[i + 3*nRow]}</td>)
        }
        return cols
    }

    renderTable(step, stepIndex){
        const rows = []
        for(let i = 0; i < 3; i++){
            rows.push(<tr key={i}>{this.renderRow(i, step)}</tr>)
        }
        return <MoveTable
            current={stepIndex == this.state.stepNumber}
            onClick={() => this.jumpTo(stepIndex)}
        ><tbody>
            {rows}
        </tbody></MoveTable>
    }

    renderMoves(){
        const history = this.state.history
        
        let moves = history.map((step, stepIndex) => {
            return <li key={stepIndex}>
                {this.renderTable(step, stepIndex)}
            </li>
        })

        if (!this.state.ascending){
            moves = moves.reverse()
        }
        return moves
    }

    render() { 
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const [winner, winnerSquares] = gameOver(current.squares)

        // define game status
        let status
        if (winner == 'draw'){
            status = 'Draw'
        } else if (winner){
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <SuperWrapper>
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                winnerSquares={winnerSquares}
            />
            <GameInfo>
                <Status>{ status }</Status>
                <button onClick={() => this.handleSort()}>
                    {(!this.state.ascending) ? 'Ascending' : 'Descending'}
                </button>
                <ol reversed={!this.state.ascending}>{this.renderMoves()}</ol>
            </GameInfo>
        </SuperWrapper>
        )
    }
}

function gameOver(squares) {

    // all possible victories
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [
            squares[a],     // who won (X or O)
            [a, b, c]       // winner squares indexes
        ]
      }
    }

    // draw
    if (!squares.includes(null)){
        return ['draw', []]
    }

    return [null, []]
}