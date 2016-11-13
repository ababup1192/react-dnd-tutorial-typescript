// import Style Sheet
import "../style/main.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { List } from "immutable";

import Dispatcher from "./actionCreators/dispatcher";
import { GameAction, Position } from "./actionCreators/gameAction";
import Board from "./components/Board";

const dispatcher = new Dispatcher();
const firstPosition: [number, number] = [4, 7];

const gameAction: GameAction = new GameAction(dispatcher, firstPosition);
const gameEvent: Bacon.Property<Position, Position> = gameAction.createProperty();

gameEvent.onValue((position: Position) => {
    ReactDOM.render(<Board knightPosition={position} gameAction={gameAction} />,
        document.getElementById("content")
    );
});
