import { RefObject, useRef, useEffect } from "react";
import { useState } from "react";
import Canvas from "./components/Canvas";
import MainToolbar from "./components/Toolbar";
import PaletteToolbar from "./components/PaletteBar";
import { brushMode } from "./types/toolMode";

function App() {
    const [opacity, setOpacity] = useState<number>(100);
    const [mode, setMode] = useState<brushMode>(brushMode.Paint);
    const [size, setSize] = useState<number>(10);
    const [color, setColor] = useState<string>("#000000");
    const [drawing, setDrawing] = useState<boolean>(false);
    const canvasRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log(mode);
    }, [mode]);
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

    const handleChangeMode = (mode: brushMode) => {
        setMode(mode);
    };
    return (
        <div className="App">
            <MainToolbar
                mode={mode}
                opacity={opacity}
                drawing={drawing}
                color={color}
                size={size}
                handleChangeMode={handleChangeMode}
                handleChangeOpacity={handleChangeOpacity}
                handleClear={handleClear}
                handleColorChange={handleChangeColor}
                handleSizeChange={handleLineWidthChange}
            />
            <Canvas
                mode={mode}
                opacity={opacity}
                canvasRef={canvasRef}
                drawing={drawing}
                handleDrawing={handleDrawing}
                color={color}
                lineWidth={size}
            />
            <PaletteToolbar
                color={color}
                handleColorChange={handleChangeColor}
            />
        </div>
    );
}

export default App;
