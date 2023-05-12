import { RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import Paint from "./components/Paint";
import Tool from "./components/Tool";
import Palette from "./components/Palette";

function App() {
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [color, setColor] = useState<string>("#000000");
    const [hideTools, setHideTools] = useState<boolean>(false);
    const [drawing, setDrawing] = useState<boolean>(false);
    const canvasRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (drawing) {
                setHideTools(true);
            } else {
                setHideTools(false);
            }
        };
        window.addEventListener("mousemove", handle);
        return () => {
            return window.removeEventListener("mousemove", handle);
        };
    });

    const handleChangColor = (color: string) => {
        setColor(color);
    };

    const handleLineWidthChange = (line: number) => {
        setLineWidth(line);
    };

    const handleDrawing = (value: boolean) => {
        setDrawing(value);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    };

    return (
        <div className="App" style={{border:"1px solid red"}}>
            <Tool
                hide={hideTools}
                color={color}
                lineWidth={lineWidth}
                handleClear={handleClear}
                handleColorChange={handleChangColor}
                handleLineWidthChange={handleLineWidthChange}
            />
            <Paint
                canvasRef={canvasRef}
                drawing={drawing}
                handleDrawing={handleDrawing}
                color={color}
                lineWidth={lineWidth}
            />
            <Palette  color={color} handleColorChange={handleChangColor}/>
        </div>
    );
}

export default App;
