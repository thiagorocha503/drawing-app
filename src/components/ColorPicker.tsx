import "./ColorPicker.css";

type ColorPickerProps = {
    color: string;
    onClick: (color: string) => void;
};
export default function ColorPicker({ color, onClick }: ColorPickerProps) {
    return (
        <input
            className="picker"
            id="picker"
            type="color"
            value={color}
            onChange={(e) => onClick(e.target.value)}
            aria-label="pincel color"
            title="color"
        />
    );
}
