import { RefObject, useRef } from "react";

type ColorPickerProps = {
    color: string;
    onClick: (color: string) => void;
};
export default function ColorPicker({ color, onClick }: ColorPickerProps) {
    const inputRef: RefObject<HTMLInputElement> =
        useRef<HTMLInputElement>(null);
    return (
        <div aria-label="pincel color" title="Color">
            <div
                className="outter-circle"               
                style={{ backgroundColor: color, border: "3px solid #555555" }}
                onClick={() => {
                    inputRef.current?.click();
                }}
            ></div>
            <input
                ref={inputRef}
                style={{ display: "none" }}
                id="picker"
                type="color"
                value={color}
                onChange={(e) => onClick(e.target.value)}
            />
        </div>
    );
}
