export default function OpacityMenu({
    opacity,
    handleOpacityChange,
}: {
    opacity: number;
    handleOpacityChange: (v: number) => void;
}) {
    return (
        <div className="menu">
            <div>
                <label htmlFor="opacity">Opacity</label>
                <span>{opacity}%</span>
            </div>
            <div>
                <input
                    id="opacity"
                    style={{ width: "100%" }}
                    value={opacity}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e) =>
                        handleOpacityChange(parseFloat(e.target.value))
                    }
                    type="range"
                    aria-label="opacity"
                    title="opacity"
                />
            </div>
        </div>
    );
}
