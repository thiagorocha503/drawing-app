type SizeButtonProps = {
    currentSize: number;
    showSizeContext: boolean;
    handleShowSizeContext: (show: boolean) => void;
    handleChangeSize: (value: number) => void;
};
const maxSize: number = 40;
const minSize: number = 1;
const step: number = 0.5;
export default function SizeButton({
    showSizeContext,
    currentSize,
    handleChangeSize,
    handleShowSizeContext: setShowSizeContext,
}: SizeButtonProps) {
    const w = (100 * currentSize) / maxSize;

    return (
        <div className="size-container">
            <div
                className="outter-circle"
                onClick={(e) => {
                    e.preventDefault();
                    setShowSizeContext(!showSizeContext);
                }}
                title="size"
                aria-label="change size"
            >
                <div
                    className="inner-circle"
                    style={{
                        width: `${w}%`,
                        height: `${w}%`,
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
                        id="lineWidth"
                        value={currentSize}
                        min={minSize}
                        max={maxSize}
                        step={step}
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
/*

 <input
            id="lineWidth"
            value={size}
            min={1}
            max={30}
            step={1}
            onChange={(e) => onClick(parseFloat(e.target.value))}
            type="range"
            aria-label="pincel line width"
            title="line width"
        />
*/
