// third
import React from 'react'
import styled from 'styled-components'

// local
import Board from './board.js'
import palettes from './styles/palettes.js'

// styles
const stdPalette = palettes.defaultPalette
const initialPaddingTop = 18
const SuperWrapper = styled.div`
    width: 100%;
    padding-top: ${({firstMove}) =>{
        return (firstMove) ? initialPaddingTop : 0
    }}vh;
    min-height: ${({firstMove}) =>{
        return (firstMove) ? 100-initialPaddingTop : 100
    }}vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: padding-top 0.5s, height 0.5s;
    background-color: ${stdPalette[0]};
`
const TitleWrapper = styled.div``

const Title = styled.h1`
    color: ${stdPalette[1]};
    font-size: 6vh;
    margin-bottom: 0px;
    text-align: left;
`

const SubTitle = styled.h5`
    color: ${stdPalette[1]};
    font-size: 2vh;
    margin-top: 0px;
    width: 100%;
    text-align: right;
`

const GameWrapper = styled.div`
    display: flex;
    width: 30vh;
    height: 30vh;
    flex-direction: row;
    background-color: ${stdPalette[1]};
    box-shadow: 16px 16px 10px -8px rgba(0,0,0,0.43);
`

const GameInfo = styled.div`
    width: 90%;
    padding: 0 5%;
    margin-top: 2vh;
    font-size: 4vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Status = styled.div`
    color: ${stdPalette[1]};
    margin-bottom: 4vh;
    border: 2px dashed ${stdPalette[1]};
    padding: 1vh;
`

    
const stdBorderSize = 2
const stdBorderSuffix = `px dashed`
const stdBorder = `${stdBorderSize}${stdBorderSuffix} ${stdPalette[1]}`
const invisibleBorder = `${stdBorderSize}${stdBorderSuffix} ${stdPalette[0]}`
const MoveTable = styled.table`
    cursor: pointer;
    font-size: 15px;
    padding: 8px;
    color: ${stdPalette[1]};
    border: ${({current}) => {
        return (current) ? stdBorder : invisibleBorder  
    }};

    &:hover{
        color: ${stdPalette[0]};
        background-color: ${stdPalette[1]};

        td {
            border-color: ${stdPalette[0]};
        }
    }
`

const MoveRow = styled.tr`
    margin-bottom: 8px;
`

const MoveSquare = styled.td`
    background-color: inherit;
    width: 4vw;
    height: 4vw;
    font-weight: bold;
    padding: 0;
    text-align: center;
    border-bottom: ${({squareIndex}) => {
        return (squareIndex < 6 ? stdBorderSize : 0)}
    }${stdBorderSuffix};
    border-left: ${({squareIndex}) => {
        return (!(squareIndex % 3 == 0) ? stdBorderSize : 0)}
    }${stdBorderSuffix};
    position: relative;
`

const HistoryWrapper = styled.div`
    width: 100%;
`

const History = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
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

    renderTable(step, stepIndex){
        const rows = []
        for(let i = 0; i < 3; i++){
            const squares = []
            for(let j = 0; j < 3; j++) {
                const squareIndex = i*3 + j
                squares.push(
                    <MoveSquare key={squareIndex} squareIndex={squareIndex}>
                        {step.squares[squareIndex]}
                    </MoveSquare>
                )
            }
            rows.push(<MoveRow key={i}>{squares}</MoveRow>)
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
        
        const moves = history.map((element, i) => {
            // avoid rendering first element on history. Because is always empty
            if (i !== 0) {
                return this.renderTable(element, i)
            }
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
            <SuperWrapper firstMove={this.state.history.length == 1}>
                <TitleWrapper>
                    <Title>
                        TIC TAC TOE
                    </Title>
                    <SubTitle>
                        Created by: BortoBoy
                    </SubTitle>
                </TitleWrapper>
                <GameWrapper>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerSquares={winnerSquares}
                    />
                </GameWrapper>
                <GameInfo>
                    <Status>{ status }</Status>
                    <HistoryWrapper>
                        {/* <button onClick={() => this.handleSort()}>
                            {(!this.state.ascending) ? 'Ascending' : 'Descending'}
                        </button> */}
                        <History reversed={!this.state.ascending}>{this.renderMoves()}</History>
                    </HistoryWrapper>
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