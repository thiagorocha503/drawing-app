import { useEffect, useState } from "react";
import Clean from "./Clean";
import Size from "./Size";
import ColorPicker from "./ColorPicker";
import "./Toolbar.css";
import OpacityButton from "./OpacityButton";


type ToolProps = {
    opacity: number;
    color: string;
    size: number;
    drawing: boolean;
    handleChangeOpacity: (value: number) => void;
    handleColorChange: (color: string) => void;
    handleSizeChange: (lineWidth: number) => void;
    handleClear: () => void;
};
export default function Tool({
    opacity,
    color,
    size,
    drawing,
    handleSizeChange,
    handleColorChange,
    handleChangeOpacity,
    handleClear,
}: ToolProps) {
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
            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        flexGrow: "1",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", paddingBottom:"8px" }}>
                        <ColorPicker
                            color={color}
                            onClick={handleColorChange}
                        />
                    </div>
                    <div style={{paddingBottom:"8px"}}>
                        <Size
                            showSizeContext={showSizeContext}
                            handleShowSizeContext={handleShowSizeContext}
                            currentSize={size}
                            handleChangeSize={handleSizeChange}
                        />
                    </div>
                    <div style={{paddingBottom:"8px"}}>
                        <OpacityButton
                            showOpacityContext={showOpacityContext}
                            handleOpacityChange={handleChangeOpacity}
                            handleOpacityContext={handleOpacityContext}
                            opacity={opacity}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Clean onClick={handleClear} />
            </div>
        </div>
    );
}
