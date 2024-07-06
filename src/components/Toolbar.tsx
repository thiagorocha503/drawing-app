import { useEffect, useState } from "react";
import SizeButton from "./SizeButton";
import "./Toolbar.css";
import OpacityButton from "./OpacityButton";
import Eraser from "./Eraser";
import Paint from "./Paint";
import { tool } from "../types/tool";
import { settings } from "../types/settings";
import Color from "./Color";

type ToolbarProps = {
    mode: tool;
    opacity: number;
    color: string;
    size: number;
    drawing: boolean;
    showMenu: boolean;
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
    showMenu: show,
    handleChangeMode,
    handleSizeChange,
    handleColorChange,
    handleChangeOpacity,
}: ToolbarProps) {
    const [showOpacityMenu, setShowOpacityMenu] = useState<boolean>(false);
    const [showSizeMenu, setShowSizeMenu] = useState<boolean>(false);
    const [showColorMenu, setShowColorMenu] = useState<boolean>(false);

    useEffect(() => {
        if (drawing) {
            hideMenu();
        }
    }, [drawing]);

    const hideMenu = () => {
        setShowOpacityMenu(false);
        setShowSizeMenu(false);
        setShowColorMenu(false);
    };

    const handleClickSetting = (v: settings) => {
        hideMenu();
        if (v === settings.opacity) {
            setShowOpacityMenu((e) => !showOpacityMenu);
        }
        if (v === settings.size) {
            setShowSizeMenu((e) => !showSizeMenu);
        }
        if (v === settings.color) {
            console.log(v);
            setShowColorMenu((e) => !showColorMenu);
        }
    };

    return (
        <div className={`tool ${drawing || !show ? "tool-out" : "tool-in"}`}>
            <div>
                <Paint
                    active={mode === tool.Paint}
                    onClick={() => {
                        handleChangeMode(tool.Paint);
                        hideMenu();
                    }}
                />
            </div>
            <div>
                <Eraser
                    active={mode === tool.Eraser}
                    onClick={() => {
                        handleChangeMode(tool.Eraser);
                        hideMenu();
                    }}
                />
            </div>

            <div>
                <Color
                    handleColorChange={handleColorChange}
                    color={color}
                    showMenu={showColorMenu}
                    handleClickSetting={handleClickSetting}
                />
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
