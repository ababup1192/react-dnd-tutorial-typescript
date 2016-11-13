import * as React from "react";
import Square from "./Square";
import { GameAction, Position } from "../actionCreators/GameAction";
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
    knightPosition: Position;
    position: Position;
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

    renderOverlay(color: string) {
        return <div className={`highlight-square ${color}`} />;
    }

    render() {
        const {children, black, connectDropTarget, isOver, canDrop} = this.props;

        return connectDropTarget(
            <div className="board-square">
                <Square black={black}>
                    {children}
                </Square>
                {isOver && !canDrop && this.renderOverlay("background-red")}
                {!isOver && canDrop && this.renderOverlay("background-yellow")}
                {isOver && canDrop && this.renderOverlay("background-green")}
            </div>);
    }
}

const squareTarget: DropTargetSpec<IBoardSquareProps> = {
    canDrop(props: IBoardSquareProps): boolean {
        return props.gameAction.canMoveKnight(props.knightPosition, props.position);
    },
    drop(props: IBoardSquareProps) {
        props.gameAction.moveKnight(props.position);
    }
};


const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor): IDropTargetBoardSquareProps => (
    {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
);

export const BoardSquareTarget: React.ComponentClass<IBoardSquareProps> = DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);