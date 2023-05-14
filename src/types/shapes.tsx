import { Position } from "./position";

export abstract class Shapes {}

export class LineDraw extends Shapes {
    private _paths: Position[];
    private _style: LineStyle;
    constructor(paths: Position[], style: LineStyle) {
        super();
        this._paths = paths;
        this._style = style;
    }

    get paths(): Position[] {
        return this._paths;
    }
    get style(): LineStyle {
        return this._style;
    }
}

export type LineCap = "butt" | "round" | "square";
export type LineJoin = "bevel" | "miter" | "round";

export type LineStyle = {
    strokeColor: string;
    lineCap: LineCap;
    lineJoin: LineJoin;
    lineWidth: number;
};
