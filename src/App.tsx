import { RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import Paint from "./components/Paint";
import Tool from "./components/Tool";

const toolWidth = 110;

function App() {
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [color, setColor] = useState<string>("#000000");
    const [slide, setSlider] = useState<boolean>(false);
    const [drawing, setDrawing] = useState<boolean>(false);
    const canvasRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (drawing) {
                if (e.clientX <= toolWidth + 50) {
                    setSlider(true);
                } else {
                    setSlider(false);
                }
            } else {
                setSlider(false);
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
        <div className="App">
            <Tool
                slide={slide}
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
        </div>
    );
}

export default App;
