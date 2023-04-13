import './styles/square.css'

export default function Square(props){
    return <button
        className={"Square" + (props.highlight ? " Highlight" : "")}
        onClick={props.onClick}
    >
        {props.value}
    </button>
}