import { RefObject, MouseEvent, useState, useRef } from "react";
import { rgbToDec } from "../util/convertion";
import { Position } from "../types/position";
import "./Canvas.css";
import { brushMode } from "../types/toolMode";

type Canvas = {
    mode: brushMode;
    opacity: number;
    drawing: boolean;
    color: string;
    lineWidth: number;
    canvasRef: RefObject<HTMLCanvasElement>;
    handleDrawing: (b: boolean) => void;
};

const lineCap: "butt" | "round" | "square" = "round";
const lineJoin: "bevel" | "miter" | "round" = "round";
export default function Canvas({
    mode,
    opacity,
    color,
    lineWidth,
    drawing,
    handleDrawing,
    canvasRef: paperRef,
}: Canvas) {
    const offScreenRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const [paths, setPaths] = useState<Position[]>([]);

    const handleMouseDown = (evt: MouseEvent) => {
        const canvas = offScreenRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx?.beginPath();
        const { red, green, blue } = rgbToDec(color);
        ctx.strokeStyle =
            mode === brushMode.Paint
                ? `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
                : "white";
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        ctx.lineWidth = lineWidth;
        const { x, y } = currentPosition(evt);
        ctx?.moveTo(x, y);
        setPaths((paths) => [...paths, { x, y }]);
        handleDrawing(true);
    };

    const currentPosition = (evt: MouseEvent): Position => {
        return {
            x: evt.clientX - offScreenRef.current!.offsetLeft,
            y: evt.clientY - offScreenRef.current!.offsetTop,
        };
    };

    const handleMouseMove = (evt: MouseEvent) => {
        const canvas = offScreenRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!drawing) {
            return;
        }
        clean();
        const { x, y } = currentPosition(evt);
        ctx.lineTo(x, y);
        ctx.stroke();
        setPaths((paths) => [...paths, { x, y }]);
    };

    const draw = (canvas: HTMLCanvasElement) => {
        if (paths.length === 1) {
            return;
        }
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const { red, green, blue } = rgbToDec(color);
        ctx.beginPath();
        ctx.strokeStyle =
            mode === brushMode.Paint
                ? `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
                : "white";
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        ctx.lineWidth = lineWidth;
        for (let i = 0; i < paths.length; i++) {
            ctx.lineTo(paths[i].x, paths[i].y);
            ctx.moveTo(paths[i].x, paths[i].y);
        }
        ctx.stroke();
    };

    const clean = () => {
        const canvas = offScreenRef.current as HTMLCanvasElement;
        const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseUp = (_: MouseEvent) => {
        draw(paperRef.current as HTMLCanvasElement);
        clean();
        handleDrawing(false);
        setPaths([]);
    };

    return (
        <div className="canva-wrapper">
            <canvas
                className="offscreen"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={offScreenRef}
            ></canvas>
            <canvas
                width={window.innerWidth}
                height={window.innerHeight}
                ref={paperRef}
            ></canvas>
        </div>
    );
}
