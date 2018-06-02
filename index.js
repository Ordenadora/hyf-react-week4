import React from "react";
import ReactDOM from "react-dom";
import "./App.css";


const Cell = (props) => (
  <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
)

class Board extends React.Component {
  renderCell(i) {
      return <Cell
          value={this.props.cells[i]}
          onClick={() => this.props.onClick(i)}
      />
  }

  render() {
      return (
          <div>
              <div className="board-row">
                  {this.renderCell(0)}
                  {this.renderCell(1)}
                  {this.renderCell(2)}
              </div>
              <div className="board-row">
                  {this.renderCell(3)}
                  {this.renderCell(4)}
                  {this.renderCell(5)}
              </div>
              <div className="board-row">
                  {this.renderCell(6)}
                  {this.renderCell(7)}
                  {this.renderCell(8)}
              </div>
          </div>
      )
  }
}

class Game extends React.Component {
  constructor() {
      super();
      this.state = {
          history: [{
              cells: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true
      };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const cells = current.cells.slice()
    if (calculateWinner(cells) || cells[i]) {
        return
    }
    cells[i] = this.state.xIsNext ? 'X' : '0'
    this.setState({
        history: history.concat([{
            cells: cells
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
    })
}
jumpTo(step) {
  this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
  })
}

render() {
  const history = this.state.history
  const current = history[this.state.stepNumber]
  const winner = calculateWinner(current.cells)
  
  const moves = history.map((step, move) => {
    const desc = move ?
        'Move #' + move :
        'Game start';
    return (
        <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
    )
})

const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : '0')

return (
    <div className="game">
        <div className="game-board">
            <Board
                cells={current.cells}
                onClick={(i) => this.handleClick(i)}
            />
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
    </div>
)
}
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)

function calculateWinner(cells) {
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
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          return cells[a]
      }
  }
  return null
}
