import { useEffect, useState } from "react";
import SizeButton from "./SizeButton";
import ColorPicker from "./ColorPicker";
import "./Toolbar.css";
import OpacityButton from "./OpacityButton";
import Eraser from "./Eraser";
import Paint from "./Paint";
import { tool } from "../types/tool";
import { settings } from "../types/settings";

type ToolbarProps = {
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
export default function Toolbar({
    opacity,
    mode,
    color,
    size,
    drawing,
    handleChangeMode,
    handleSizeChange,
    handleColorChange,
    handleChangeOpacity,
}: ToolbarProps) {
    const [showOpacityMenu, setShowOpacityMenu] = useState<boolean>(false);
    const [showSizeMenu, setShowSizeMenu] = useState<boolean>(false);

    useEffect(() => {
        if (drawing) {
            hideMenu();
        }
    }, [drawing]);

    
    const hideMenu = () => {
        setShowOpacityMenu(false);
        setShowSizeMenu(false);
    };
    
    const handleClickSetting = (v: settings) => {
        hideMenu();
        if (v === settings.opacity) {
            setShowOpacityMenu(true);
        }
        if (v === settings.size) {
            setShowSizeMenu(true);
        }
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
            <div>
                <SizeButton
                    mode={mode}
                    showMenu={showSizeMenu}
                    handleClickSetting={handleClickSetting}
                    currentSize={size}
                    handleChangeSize={handleSizeChange}
                />
            </div>
            <div>
                <OpacityButton
                    opacity={opacity}
                    showMenu={showOpacityMenu}
                    handleOpacityChange={handleChangeOpacity}
                    handleClickSetting={handleClickSetting}
                />
            </div>
        </div>
    );
}
