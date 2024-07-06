import {
    MAX_BRUSH_SIZE,
    MAX_ERASER_SIZE,
    MIN_BRUSH_SIZE,
    MIN_ERASER_SIZE,
    STEP_BRUSH,
} from "../constants/input";
import { tool } from "../types/tool";

export default function SizeMenu({
    mode,
    currentSize,
    handleChangeSize,
}: {
    mode: tool;
    currentSize: number;
    handleChangeSize: (v: number) => void;
}) {
    return (
        <div
            className="menu"
        >
            <div style={{display:"flex", justifyContent:"space-between", paddingBottom: "8px"}}>
                <label htmlFor="lineWidth">Size</label>
                <span>{currentSize}px</span>
            </div>
            <div>
                <input
                    style={{ width: "100%" }}
                    id="lineWidth"
                    value={currentSize}
                    min={mode === tool.Paint ? MIN_BRUSH_SIZE : MIN_ERASER_SIZE}
                    max={mode === tool.Paint ? MAX_BRUSH_SIZE : MAX_ERASER_SIZE}
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
    );
}
