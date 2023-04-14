//third
import styled from 'styled-components'

const SquareButton = styled.button`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
    color: ${({highlight}) => {
        return (highlight) ? "red" : "inherit"
    }};

`

export default function Square(props){
    return <SquareButton
        highlight={props.highlight}
        onClick={props.onClick}
    >
        {props.value}
    </SquareButton>
}