import * as React from "react";
import Square from "./Square";
import { GameAction } from "../actionCreators/GameAction";
import { ItemTypes } from "../constants";
import {
    DropTarget,
    DropTargetSpec,
    DropTargetCollector,
    DropTargetConnector,
    DropTargetMonitor,
    ConnectDropTarget
} from "react-dnd";

interface IBoardSquareProps {
    position: [number, number];
    black: boolean;
    gameAction: GameAction;
}

interface IDropTargetBoardSquareProps {
    isOver: boolean;
    connectDropTarget: ConnectDropTarget;
    canDrop: boolean;
}

class BoardSquare extends React.Component<IBoardSquareProps &
    IDropTargetBoardSquareProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {children, black, connectDropTarget, isOver} = this.props;
        const [x, y] = this.props.position;

        return connectDropTarget(
            <div className="board-square">
                <Square black={black}>
                    children
                </Square>
                {
                    isOver && <div className="highlight-square" />
                }
            </div>);
    }
}

const squareTarget: DropTargetSpec<IBoardSquareProps> = {
    drop(props: IBoardSquareProps) {
        props.gameAction.moveKnight(props.position);
    }
};


const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor): IDropTargetBoardSquareProps => (
    {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    }
);

export const BoardSquareTarget: React.ComponentClass<IBoardSquareProps> = DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);