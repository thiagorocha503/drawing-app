import { palette } from "../constants/palette";
import Clean from "./Clean";
import Color from "./Color";
import LineWidth from "./LineWidth";
import ColorPicker from "./ColorPicker";
import "./Tool.css";

type ToolProps = {
    color: string;
    lineWidth: number;
    slide: boolean;
    handleColorChange: (color: string) => void;
    handleLineWidthChange: (lineWidth: number) => void;
    handleClear: () => void;
};
export default function Tool({
    color,
    lineWidth,
    slide,
    handleColorChange,
    handleLineWidthChange,
    handleClear,
}: ToolProps) {
    return (
        <div className={`tool ${slide ? "slide-out" : "slide-in"}`}>
            <div
                style={{
                    flexGrow: 1,
                    // border: "1px solid black",
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
                    <div style={{display: "flex", alignItems:"center"}}>
                        <ColorPicker color={color} onClick={handleColorChange} />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        {palette.map((color) => (
                            <Color onClick={handleColorChange} color={color} />
                        ))}
                    </div>
                </div>
                <div>
                    <LineWidth
                        lineWidth={lineWidth}
                        onClick={handleLineWidthChange}
                    />
                </div>
            </div>
            <div>
                <Clean onClick={handleClear} />
            </div>
        </div>
    );
}
