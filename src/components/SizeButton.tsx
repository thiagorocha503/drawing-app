import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE, STEP_BRUSH } from "../constants/input";

type SizeButtonProps = {
    currentSize: number;
    showSizeContext: boolean;
    handleShowSizeContext: (show: boolean) => void;
    handleChangeSize: (value: number) => void;
};
export default function SizeButton({
    showSizeContext,
    currentSize,
    handleChangeSize,
    handleShowSizeContext: setShowSizeContext,
}: SizeButtonProps) {
    const w = (100 * currentSize) / MAX_BRUSH_SIZE;
    return (
        <div style={{ position: "relative" }}>
            <div
                className="outter-circle"
                onClick={(e) => {
                    e.preventDefault();
                    setShowSizeContext(!showSizeContext);
                }}
                style={{ border: "2px solid #4f4f4f" }}
                title="Size"
            >
                <div
                    className="inner-circle"
                    style={{
                        width: `${w}%`,
                        height: `${w}%`,
                        background: "background-color: #202020",
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
                        min={MIN_BRUSH_SIZE}
                        max={MAX_BRUSH_SIZE}
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
