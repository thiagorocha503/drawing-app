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
            <div>
                <label htmlFor="picker">Color</label>
                <input
                    className="picker"
                    id="picker"
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    aria-label="pincel color"
                />

                <label htmlFor="lineWidth">Line width</label>
                <input
                    id="lineWidth"
                    value={lineWidth}
                    min={1}
                    max={30}
                    step={1}
                    onChange={(e) =>
                        handleLineWidthChange(parseInt(e.target.value))
                    }
                    type="range"
                    aria-label="pincel line width"
                />
            </div>
            <div>
            <input
                id="clear"
                type="button"
                value="clear"
                onClick={() => handleClear()}
                aria-label="clean paint"
            />
            </div>

           
        </div>
    );
}
