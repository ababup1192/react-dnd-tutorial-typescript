import * as React from "react";
import { List, Range } from "immutable";
import {
    DragSource,
    DragSourceMonitor,
    DragSourceConnector,
    DragSourceSpec,
    ConnectDragSource
} from "react-dnd";
import { ItemTypes } from "../constants";

interface IKnightProps {
    black: boolean;
}

interface IDragSourceKnightProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

class Knight extends React.Component<IKnightProps &
    IDragSourceKnightProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {connectDragSource, isDragging} = this.props;
        const black = this.props.black ? "knight-black" : "knight-white";
        const opacity = isDragging ? "harf-opacity" : "no-opacity";

        return this.props.connectDragSource(<span
            className={`knight ${black} ${opacity}`}>
        ♘
        </span>);
    }
}

const knightSource: DragSourceSpec<IKnightProps> = {
    beginDrag(props: IKnightProps) {
        return {};
    }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor): IDragSourceKnightProps {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export const KightSource: React.ComponentClass<IKnightProps> = DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);