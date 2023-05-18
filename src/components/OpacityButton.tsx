type OpacityButtonProps = {
    opacity: number;
    showOpacityContext: boolean;
    handleOpacityContext: (v: boolean) => void;
    handleOpacityChange: (v: number) => void;
};
const minOpacity = 1;
const maxOpacity = 100;
const step = 1.5;
export default function OpacityButton({
    opacity,
    handleOpacityContext,
    handleOpacityChange,
    showOpacityContext,
}: OpacityButtonProps) {
    return (
        <div
            style={{
                position: "relative",
            }}
            title="Opacity"
        >
            <div
                className="outter-circle"
                style={{ backgroundColor: "#D3D3D3" }}
                onClick={() => handleOpacityContext(!showOpacityContext)}
            >
                <div
                    className="inner-circle"
                    style={{
                        height: "60%",
                        width: "60%",
                        backgroundColor: "black",
                        opacity: opacity / 100,
                    }}
                ></div>
            </div>
            <div
                className="dialog"
                style={{ display: showOpacityContext ? "block" : "none" }}
            >
                <div>
                    <label htmlFor="opacity">Opacity</label>
                    <span>{opacity}%</span>
                </div>
                <div>
                    <input
                        id="opacity"
                        style={{ width: "100%" }}
                        value={opacity}
                        min={minOpacity}
                        max={maxOpacity}
                        step={step}
                        onChange={(e) =>
                            handleOpacityChange(parseFloat(e.target.value))
                        }
                        type="range"
                        aria-label="opacity"
                        title="opacity"
                    />
                </div>
            </div>
        </div>
    );
}
