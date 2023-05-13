import { useEffect, useState } from "react";
import Clean from "./Clean";
import SizeButton from "./SizeButton";

import ColorPicker from "./ColorPicker";
import "./Toolbar.css";
import OpacityButton from "./OpacityButton";
import Eraser from "./Eraser";
import Paint from "./Paint";
import { brushMode } from "../types/toolMode";

type MainToolbarProps = {
    mode: brushMode;
    opacity: number;
    color: string;
    size: number;
    drawing: boolean;
    handleChangeMode: (mode: brushMode) => void;
    handleChangeOpacity: (value: number) => void;
    handleColorChange: (color: string) => void;
    handleSizeChange: (lineWidth: number) => void;
    handleClear: () => void;
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
    handleClear,
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
                    active={mode === brushMode.Paint}
                    onClick={() => handleChangeMode(brushMode.Paint)}
                />
            </div>
            <div>
                <Eraser
                    active={mode === brushMode.Eraser}
                    onClick={() => handleChangeMode(brushMode.Eraser)}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "8px",
                }}
            >
                <ColorPicker color={color} onClick={handleColorChange} />
            </div>
            <div style={{ paddingBottom: "8px" }}>
                <SizeButton
                    showSizeContext={showSizeContext}
                    handleShowSizeContext={handleShowSizeContext}
                    currentSize={size}
                    handleChangeSize={handleSizeChange}
                />
            </div>
            <div style={{ paddingBottom: "8px" }}>
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
