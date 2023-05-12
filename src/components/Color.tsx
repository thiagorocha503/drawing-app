import "./Color.css";

export default function Color({
    color,
    onClick,
}: {
    color: string;
    onClick: (color: string) => void;
}) {
    return (
        <button
            className="color"
            type="button"
            style={{ backgroundColor: color, display: "block" }}
            onClick={() => onClick(color)}
        ></button>
    );
}
