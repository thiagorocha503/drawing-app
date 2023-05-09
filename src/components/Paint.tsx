import {  RefObject, MouseEvent } from "react";

type PaintProps = {
    drawing: boolean;
    color: string;
    lineWidth: number;
    canvasRef: RefObject<HTMLCanvasElement>;
    handleDrawing: (b: boolean) => void;
};

export default function Paint({
    color,
    lineWidth,
    drawing,
    handleDrawing,
    canvasRef,
}: PaintProps) {
    const handleMouseDown = (evt: MouseEvent) => {
        const canvas: HTMLCanvasElement =
            canvasRef.current as HTMLCanvasElement;
        const context: CanvasRenderingContext2D | null =
            canvas?.getContext("2d");
        context?.beginPath();
        context?.moveTo(
            evt.clientX - canvas.offsetLeft,
            evt.clientY - canvas.offsetTop
        );
        handleDrawing(true);
    };

    const handleMouseMove = (evt: MouseEvent) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas?.getContext("2d") as CanvasRenderingContext2D;
        if (drawing) {
            context?.lineTo(
                evt.clientX - canvas.offsetLeft,
                evt.clientY - canvas.offsetTop
            );
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context?.stroke();
        }
    };

    const handleMouseUp = (_: MouseEvent) => {
        canvasRef.current?.getContext("2d")?.closePath();
        handleDrawing(false);
    };

    return (
        <div
            className="canva-wrapper"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <canvas
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={canvasRef}
            ></canvas>
        </div>
    );
}
