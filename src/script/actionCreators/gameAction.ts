import * as Bacon from "baconjs";
import Dispatcher from "./dispatcher";

const MOVE_KNIGHT = "MOVE_KNIGHT";

export type Position = [number, number];

export class GameAction {
    private d: Dispatcher;
    private firstPosition: Position;

    constructor(dispatcher: Dispatcher, firstPosition: Position) {
        this.d = dispatcher;
        this.firstPosition = firstPosition;
    }

    public moveKnight(position: Position) {
        this.d.push(MOVE_KNIGHT, position);
    }

    public canMoveKnight(oldPosition: Position, newPosition: Position): boolean {
        const [x, y] = oldPosition;
        const [toX, toY] = newPosition;
        const dx = toX - x;
        const dy = toY - y;

        return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
    }

    public createProperty(): Bacon.Property<Position, Position> {
        return Bacon.update<Position, Position, Position>(this.firstPosition,
            [this.d.stream(MOVE_KNIGHT)], this._moveKnight.bind(this)
        );
    }

       private _moveKnight(oldPosition: Position, newPosition: Position): Position {
        return this.canMoveKnight(oldPosition, newPosition) ?
            newPosition :
            oldPosition;
    }
}