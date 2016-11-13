import * as React from "react";
import { List, Range } from "immutable";

interface ISquareProps {
    black: boolean;
}

export default class Square extends React.Component<ISquareProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const className = List.of("square").push(
            this.props.black ? "fill-black" : "fill-white").push(
            this.props.black ? "stroke-black" : "stroke-white"
            ).join(" ");
        return <div className={className} > {this.props.children} </div>;
    }
}

