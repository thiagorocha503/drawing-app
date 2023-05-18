import {
    MAX_BRUSH_SIZE,
    MAX_ERASER_SIZE,
    MIN_BRUSH_SIZE,
    MIN_ERASER_SIZE,
    STEP_BRUSH,
} from "../constants/input";
import { tool } from "../types/tool";

type SizeButtonProps = {
    mode: tool;
    currentSize: number;
    showSizeContext: boolean;
    handleShowSizeContext: (show: boolean) => void;
    handleChangeSize: (value: number) => void;
};
export default function SizeButton({
    mode,
    showSizeContext,
    currentSize,
    handleChangeSize,
    handleShowSizeContext: setShowSizeContext,
}: SizeButtonProps) {
    const w =
        (85 * currentSize) /
        (mode === tool.Paint ? MAX_BRUSH_SIZE : MAX_ERASER_SIZE);
    return (
        <div style={{ position: "relative" }}>
            <div
                className="outter-circle"
                onClick={(e) => {
                    e.preventDefault();
                    setShowSizeContext(!showSizeContext);
                }}
                title="Size"
            >
                <div
                    className="inner-circle"
                    style={{
                        width: `${w}%`,
                        height: `${w}%`,
                        border: "3px solid #202020",
                    }}
                ></div>
            </div>
            <div
                className="dialog"
                style={{ display: showSizeContext ? "block" : "none" }}
            >
                <div>
                    <label htmlFor="lineWidth">Size</label>
                    <span>{currentSize}px</span>
                </div>
                <div>
                    <input
                        style={{ width: "100%" }}
                        id="lineWidth"
                        value={currentSize}
                        min={
                            mode === tool.Paint
                                ? MIN_BRUSH_SIZE
                                : MIN_ERASER_SIZE
                        }
                        max={
                            mode === tool.Paint
                                ? MAX_BRUSH_SIZE
                                : MAX_ERASER_SIZE
                        }
                        step={STEP_BRUSH}
                        onChange={(e) =>
                            handleChangeSize(parseFloat(e.target.value))
                        }
                        type="range"
                        aria-label="pincel line width"
                        title="line width"
                    />
                </div>
            </div>
        </div>
    );
}
