// third
import React from 'react'
import styled from 'styled-components'
import { AiFillCaretDown } from 'react-icons/ai';
import { MdRestartAlt } from 'react-icons/md'

// local
import Board from './board.js'
import palettes from './styles/palettes.js'

// styles
const stdPalette = palettes.defaultPalette
const stdShadow = '16px 16px 10px -8px rgba(0,0,0,0.43);'
const initialPaddingTop = 18
const SuperWrapper = styled.div`
    width: 100vw;
    overflow: hidden;
    padding-top: ${({firstMove}) =>{
        return (firstMove) ? initialPaddingTop : 0
    }}vh;
    min-height: ${({firstMove}) =>{
        return (firstMove) ? 100-initialPaddingTop : 100
    }}vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    transition: padding-top 0.5s, height 0.5s;
    background-color: ${stdPalette[0]};
`
const GameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2em;
`

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

const BoardWrapper = styled.div`
    display: flex;
    width: 30vh;
    height: 30vh;
    flex-direction: row;
    background-color: ${stdPalette[1]};
    box-shadow: ${stdShadow};
`

const GameInfo = styled.div`
    font-size: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2em;
    margin-top: 1em;
`

const Status = styled.div`
    margin-top: 1em;
    font-size: 2em;
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

const TableWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TableIndex = styled.div`
    font-size: 1em;
    margin-right: 0.5em;
    color: ${stdPalette[1]}; 
`

const MoveRow = styled.tr`
    margin-bottom: 8px;
`

const MoveSquare = styled.td`
    background-color: inherit;
    width: 1em;
    height: 1em;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-bottom: 0.5em;
`
    
const HistoryTitle = styled.button`
    font-size: 0.8em;
    background-color: ${stdPalette[1]};
    border-color: ${stdPalette[1]};
    border-size: 4px;
    color: ${stdPalette[0]};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    padding: 0.5em;
    margin-bottom: 1em;
`

const History = styled.div`
    display: flex;
    flex-direction: column;
`

const OrderButton = styled.div`
    font-size: 0.8em;
    margin-left: 4px;
    font-weight: bold;
    transition: transform 0.5s ease;
    transform: rotate(${({down}) => {return (down) ? 0 : 180 }}deg)
`

const RestartWrapper = styled.div`
    color: ${stdPalette[0]};
    background-color: ${stdPalette[1]};   
    font-size: 4em;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: ${stdShadow};
    cursor: pointer;
`

const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0,
    ascending: true,
}

export default class Game extends React.Component {
    // class constructor
    constructor(props){
        super(props)
        this.state = {...initialState, firstMove: true}
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
            stepNumber: history.length-1,
            firstMove: false
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

    // restart button
    handleRestart(){
        this.setState(initialState)
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
        return <TableWrapper>
            <TableIndex>{stepIndex}. </TableIndex>

            <MoveTable
                current={stepIndex == this.state.stepNumber}
                onClick={() => this.jumpTo(stepIndex)}
            ><tbody>
                {rows}
            </tbody></MoveTable>
        </TableWrapper>
        
    }

    renderMoves(){
        const history = this.state.history
        
        let moves = history.map((element, i) => {
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
            <SuperWrapper firstMove={this.state.firstMove}>
                <GameWrapper>
                    <div>
                        <Title>
                            TIC TAC TOE
                        </Title>
                        <SubTitle>
                            Created by: BortoBoy
                        </SubTitle>
                    </div>
                    <BoardWrapper>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            winnerSquares={winnerSquares}
                        />
                    </BoardWrapper>
                    <Status>{ status }</Status>
                    <RestartWrapper onClick={() => this.handleRestart()}>
                        <MdRestartAlt />
                    </RestartWrapper>
                </GameWrapper>
                { (this.state.history.length > 1) ? (
                    <GameInfo>
                            <HistoryWrapper>
                                <HistoryTitle onClick={() => this.handleSort()}>
                                History
                                <OrderButton down={!this.state.ascending}>
                                    <AiFillCaretDown />
                                </OrderButton>
                            </HistoryTitle>
                            <History reversed={!this.state.ascending}>{this.renderMoves()}</History>
                        </HistoryWrapper>
                    </GameInfo>
                ) : "" }
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