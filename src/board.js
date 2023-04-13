// third
import React from 'react'

// local
import Square from './square.js'

export default class Board extends React.Component {

    renderRows(){
        const rows = []
        for (let i = 0; i < 3; i++) {
            const cols = []
            for (let j = 0; j < 3; j++) {
                const squareIndex = j + 3*i
                cols.push(
                    <Square
                        key={squareIndex}
                        value={this.props.squares[squareIndex]}
                        onClick={() => this.props.onClick(squareIndex)}
                        highlight={this.props.winnerSquares.includes(squareIndex)}
                    />
                )
            }
            rows.push(
                <div key={i} className="board-row">
                    {cols}
                </div>
            )
            
        }
        return rows
    }

    render() {
        return <div>
           {this.renderRows()}
        </div>
    }
}
