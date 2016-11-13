import * as React from "react";
import * as ReactDOM from "react-dom";
import { List, Range } from "immutable";
import { KightSource } from "./Knight";
import { BoardSquareTarget } from "./BoardSquare";
import { GameAction, Position } from "../actionCreators/GameAction";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

interface IBoardProps {
    knightPosition: [number, number];
    gameAction: GameAction;
    gameEvent: Bacon.Property<Position, boolean>;
}

class Board extends React.Component<IBoardProps, any> {
    constructor(props) {
        super(props);
    }

    renderSquare(i: number): JSX.Element {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const black = (x + y) % 2 === 1;

        return <div key={i}
            className="square-area">
            <BoardSquareTarget
                knightPosition={ this.props.knightPosition }
                position={[x, y]}
                black={black}
                gameAction={this.props.gameAction}>
                {this.renderPiece(x, y, !black)}
            </BoardSquareTarget>
        </div>;
    }

    renderPiece(x: number, y: number, black: boolean) {
        const [knightX, knightY] = this.props.knightPosition;
        return (x === knightX && y === knightY) ?
            <KightSource black={black} /> :
            undefined;
    }

    render() {
        const squares = Range(0, 64).reduce((list: List<JSX.Element>, i: number) =>
            list.push(this.renderSquare(i))
            , List());

        return <div className="board">
            {squares}
        </div>;
    }
}

export default DragDropContext(HTML5Backend)(Board);