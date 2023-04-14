// third
import React from 'react'
import styled from 'styled-components'

// local
import Square from './square.js'

const StyledBoard = styled.div`
    width: 90%;
    height: 90%;
    padding: 5%;
    display: flex;
    flex-direction: column;
`

const SquaresRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`

export default class Board extends React.Component {

    renderRows(){
        const rows = []
        for (let i = 0; i < 3; i++) {
            const squares = []
            for (let j = 0; j < 3; j++) {
                const squareIndex = j + 3*i
                squares.push(
                    <Square
                        key={squareIndex}
                        value={this.props.squares[squareIndex]}
                        squareIndex={squareIndex}
                        onClick={() => this.props.onClick(squareIndex)}
                        highlight={this.props.winnerSquares.includes(squareIndex)}
                    />
                )
            }
            rows.push(
                <SquaresRow key={i}>
                    {squares}
                </SquaresRow>
            )
            
        }
        return rows
    }

    render() {
        return <StyledBoard>
           {this.renderRows()}
        </StyledBoard>
    }
}
