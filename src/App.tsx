import { RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import { tool } from "./types/tool";
import Clean from "./components/Clean";
import Undo from "./components/Undo";
import Redo from "./components/Redo";
import { Shapes, LineDraw } from "./types/shapes";
import Download from "./components/Download";
import {
    MAX_BRUSH_SIZE,
    MAX_ERASER_SIZE,
    MIN_BRUSH_SIZE,
    MIN_ERASER_SIZE,
    NUMBER_KEY_TIME_RESET,
} from "./constants";

function App() {
    const [opacity, setOpacity] = useState<number>(100);
    const [mode, setMode] = useState<tool>(tool.Paint);
    const [brushSize, setBrushSize] = useState<number>(1);
    const [eraserSize, setEraserSize] = useState<number>(10);
    const [color, setColor] = useState<string>("#000000");
    const [drawing, setDrawing] = useState<boolean>(false);
    const canvasRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const downloadRef: RefObject<HTMLAnchorElement> =
        useRef<HTMLAnchorElement>(null);
    const [histories, setHistories] = useState<Array<Shapes>>([]);
    const [currentHistory, setCurrentHistory] = useState<number>(-1);
    const [keyNumberPressed, setKeyNumberPressed] = useState<any[]>([
        null,
        null,
    ]);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [showTool, setShowTool] = useState(true);

    // Opacity Shortcuts
    useEffect(() => {
        const opacity = parseInt(
            keyNumberPressed.reduce((acc, value) => {
                return value != null ? `${acc}${value}` : acc;
            }, "")
        );
        if (opacity >= 0 && opacity <= 9) {
            setOpacity(opacity * 10);
        }
        if (opacity >= 10 && opacity <= 99) {
            setOpacity(opacity);
        }
        if (opacity === 100) {
            setOpacity(100);
        }
        const func = () => {
            setKeyNumberPressed([null, null, null]);
            setTimeoutId(null);
        };
        if (timeoutId === null) {
            const id = setTimeout(func, NUMBER_KEY_TIME_RESET);
            setTimeoutId(id);
        }
    }, [keyNumberPressed, timeoutId]);

    // Shortcuts
    useEffect(() => {
        const handleKeyPress = (ev: KeyboardEvent) => {
            const key = ev.key;
            const ctrlPressed = ev.ctrlKey;
            const shiftPressed = ev.shiftKey;
            const altPressed = ev.altKey;
            // paint
            if (key === "B" || key === "b") {
                setMode(tool.Paint);
            }
            // erase
            if (key === "E" || key === "e") {
                setMode(tool.Eraser);
            }
            // brush size
            if (key === "[") {
                if (mode === tool.Paint && brushSize - 1 >= MIN_BRUSH_SIZE) {
                    setBrushSize((s) => s - 1);
                }
                if (mode === tool.Eraser && brushSize - 1 >= MIN_ERASER_SIZE) {
                    setEraserSize((s) => s - 1);
                }
            }
            if (key === "]") {
                if (mode === tool.Paint && brushSize + 1 <= MAX_BRUSH_SIZE) {
                    setBrushSize((s) => s + 1);
                }
                if (mode === tool.Eraser && brushSize + 1 <= MAX_ERASER_SIZE) {
                    setEraserSize((e) => e + 1);
                }
            }
            // undo
            if ((key === "Z" || key === "z") && ctrlPressed && !shiftPressed) {
                handleUndo();
            }
            // redo
            if ((key === "Z" || key === "z") && shiftPressed && shiftPressed) {
                handleRedo();
            }

            if ((key === "S" || key === "s") && ctrlPressed) {
                ev.preventDefault();
                downloadRef.current?.click();
            }
            if (key === "Delete") {
                handleClear();
            }
            // opacity
            if (key.match(/^[0-9]$/)) {
                setKeyNumberPressed((prev) => {
                    let keys = [...prev];
                    keys.shift();
                    keys.push(key);
                    return keys;
                });
            }
            // hide/ show tool
            if ((key === "J" || key === "j") && altPressed && ctrlPressed) {
                setShowTool((v) => !v);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    },);

    const handleChangeColor = (color: string) => {
        setColor(color);
    };

    const handleLineWidthChange = (line: number) => {
        if (mode === tool.Paint) {
            setBrushSize(line);
        }
        if (mode === tool.Eraser) {
            setEraserSize(line);
        }
    };

    const handleDrawing = (value: boolean) => {
        setDrawing(value);
    };

    const handleClear = () => {
        setHistories([]);
        setCurrentHistory(-1);
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        context?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    };

    const handleChangeOpacity = (value: number) => {
        setOpacity(value);
    };

    const handleChangeMode = (mode: tool) => {
        setMode(mode);
    };
    const handleUndo = () => {
        setCurrentHistory((h) => {
            return h - 1 < 0 ? -1 : h - 1;
        });
    };
    const handleRedo = () => {
        setCurrentHistory((h) => {
            return h + 1 >= histories.length ? histories.length : h + 1;
        });
    };

    // handle undo and redo
    useEffect(() => {
        const draw = () => {
            const canvas: HTMLCanvasElement =
                canvasRef.current as HTMLCanvasElement;
            const ctx: CanvasRenderingContext2D = canvas?.getContext(
                "2d"
            ) as CanvasRenderingContext2D;
            if (currentHistory === histories.length) {
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i <= currentHistory; i++) {
                const oneHistory = histories[i];
                // draw line
                if (oneHistory instanceof LineDraw) {
                    const line = oneHistory as LineDraw;
                    ctx.beginPath();
                    ctx.strokeStyle = line.style.strokeColor;
                    ctx.lineCap = line.style.lineCap;
                    ctx.lineJoin = line.style.lineJoin;
                    ctx.lineWidth = line.style.lineWidth;
                    const paths = line.paths;
                    for (let i = 0; i < paths.length; i++) {
                        ctx.lineTo(paths[i].x, paths[i].y);
                    }
                    ctx.stroke();
                }
            }
        };
        if (!drawing) {
            draw();
        }
    }, [currentHistory, histories, drawing]);

    return (
        <div className="App">
            <Undo
                handleUndo={handleUndo}
                currentHistory={currentHistory}
                drawing={drawing}
            />
            <Clean
                histories={histories}
                drawing={drawing}
                onClick={handleClear}
            />
            <Toolbar
                visible={showTool}
                mode={mode}
                opacity={opacity}
                drawing={drawing}
                color={color}
                size={mode === tool.Paint ? brushSize : eraserSize}
                handleChangeMode={handleChangeMode}
                handleChangeOpacity={handleChangeOpacity}
                handleColorChange={handleChangeColor}
                handleSizeChange={handleLineWidthChange}
            />
            <Canvas
                currentHistory={currentHistory}
                histories={histories}
                setCurrentHistory={setCurrentHistory}
                setHistories={setHistories}
                mode={mode}
                opacity={opacity}
                canvasRef={canvasRef}
                drawing={drawing}
                handleDrawing={handleDrawing}
                color={color}
                lineWidth={mode === tool.Paint ? brushSize : eraserSize}
            />
            <Redo
                handleRedo={handleRedo}
                currentHistory={currentHistory}
                drawing={drawing}
                histories={histories}
            />
            <Download
                drawing={drawing}
                downloadRef={downloadRef}
                canvas={canvasRef.current}
                histories={histories}
            />
        </div>
    );
}

export default App;
