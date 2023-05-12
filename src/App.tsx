import { RefObject,  useRef } from "react";
import { useState } from "react";
import Paint from "./components/Paint";
import Tool from "./components/Tool";
import Palette from "./components/Palette";

function App() {
    const [opacity, setOpacity] = useState<number>(100);
    const [size, setSize] = useState<number>(10);
    const [color, setColor] = useState<string>("#000000");
    const [drawing, setDrawing] = useState<boolean>(false);
    const canvasRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);

    const handleChangeColor = (color: string) => {
        setColor(color);
    };

    const handleLineWidthChange = (line: number) => {
        setSize(line);
    };

    const handleDrawing = (value: boolean) => {
        setDrawing(value);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    };

    const handleChangeOpacity = (value: number) => {
        setOpacity(value);
    };
    return (
        <div className="App" >
            <Tool
                opacity={opacity}
                drawing={drawing}
                color={color}
                size={size}
                handleChangeOpacity={handleChangeOpacity}
                handleClear={handleClear}
                handleColorChange={handleChangeColor}
                handleSizeChange={handleLineWidthChange}
            />
            <Paint
                opacity={opacity}
                canvasRef={canvasRef}
                drawing={drawing}
                handleDrawing={handleDrawing}
                color={color}
                lineWidth={size}
            />
            <Palette color={color} handleColorChange={handleChangeColor} />
        </div>
    );
}

export default App;
