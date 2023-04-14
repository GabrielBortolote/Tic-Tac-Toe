//third
import styled from 'styled-components'
import palettes from './styles/palettes.js'

// styles
const stdPalette = palettes.defaultPalette
const stdBorderSize = 5
const stdBorderSuffix = `px solid ${stdPalette[0]}`

const StyledSquare = styled.div`
    background-color: inherit;
    flex-grow: 1;
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

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 7vh;
    color: ${({highlight}) => {
        return (highlight) ? stdPalette[3] : stdPalette[0]
    }};
`

export default function Square(props){
    return <StyledSquare
        squareIndex={props.squareIndex}
        onClick={props.onClick}
    >
        <Content highlight={props.highlight}>
            <div>
                {props.value}
            </div>
        </Content>
    </StyledSquare>
}