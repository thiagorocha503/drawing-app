import { useEffect, useState } from "react";
import SizeButton from "./SizeButton";
import ColorPicker from "./ColorPicker";
import "./Toolbar.css";
import OpacityButton from "./OpacityButton";
import Eraser from "./Eraser";
import Paint from "./Paint";
import { tool } from "../types/tool";

type MainToolbarProps = {
    mode: tool;
    opacity: number;
    color: string;
    size: number;
    drawing: boolean;
    handleChangeMode: (mode: tool) => void;
    handleChangeOpacity: (value: number) => void;
    handleColorChange: (color: string) => void;
    handleSizeChange: (lineWidth: number) => void;
};
export default function MainToolbar({
    opacity,
    mode,
    color,
    size,
    drawing,
    handleChangeMode,
    handleSizeChange,
    handleColorChange,
    handleChangeOpacity,
}: MainToolbarProps) {
    const [showOpacityContext, setShowOpacityContext] =
        useState<boolean>(false);
    const [showSizeContext, setShowSizeContext] = useState<boolean>(false);

    useEffect(() => {
        if (drawing) {
            setShowOpacityContext(false);
            setShowSizeContext(false);
        }
    }, [drawing]);

    const handleShowSizeContext = (show: boolean) => {
        setShowSizeContext(show);
        setShowOpacityContext(false);
    };

    const handleOpacityContext = (show: boolean) => {
        setShowOpacityContext(show);
        setShowSizeContext(false);
    };

    return (
        <div className={`tool ${drawing ? "tool-out" : "tool-in"}`}>
            <div>
                <Paint
                    active={mode === tool.Paint}
                    onClick={() => handleChangeMode(tool.Paint)}
                />
            </div>
            <div>
                <Eraser
                    active={mode === tool.Eraser}
                    onClick={() => handleChangeMode(tool.Eraser)}
                />
            </div>

            <div>
                <ColorPicker color={color} onClick={handleColorChange} />
            </div>
            <div style={{ paddingBottom: "8px" }}>
                <SizeButton
                    mode={mode}
                    showSizeContext={showSizeContext}
                    handleShowSizeContext={handleShowSizeContext}
                    currentSize={size}
                    handleChangeSize={handleSizeChange}
                />
            </div>
            <div>
                <OpacityButton
                    showOpacityContext={showOpacityContext}
                    handleOpacityChange={handleChangeOpacity}
                    handleOpacityContext={handleOpacityContext}
                    opacity={opacity}
                />
            </div>
        </div>
    );
}
