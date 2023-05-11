type LineWidthProps = {
    lineWidth: number;
    onClick: (value: number) => void;
};
export default function LineWidth({ lineWidth, onClick }: LineWidthProps) {
    return (
        <input
            id="lineWidth"
            value={lineWidth}
            min={1}
            max={30}
            step={1}
            onChange={(e) => onClick(parseFloat(e.target.value))}
            type="range"
            aria-label="pincel line width"
            title="line width"
        />
    );
}
