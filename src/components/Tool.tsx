import Clean from "./Clean";
import LineWidth from "./LineWidth";
import ColorPicker from "./ColorPicker";
import "./Tool.css";

type ToolProps = {
    color: string;
    lineWidth: number;
    hide: boolean;
    handleColorChange: (color: string) => void;
    handleLineWidthChange: (lineWidth: number) => void;
    handleClear: () => void;
};
export default function Tool({
    color,
    lineWidth,
    hide,
    handleColorChange,
    handleLineWidthChange,
    handleClear,
}: ToolProps) {
    return (
        <div className={`tool ${hide ? "tool-out" : "tool-in"}`}>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ColorPicker
                            color={color}
                            onClick={handleColorChange}
                        />
                    </div>
                    <div>
                        <LineWidth
                            lineWidth={lineWidth}
                            onClick={handleLineWidthChange}
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
