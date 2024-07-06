import { useRef } from "react";
import { settings } from "../types/settings";

type ColorPickerProps = {
    handleClickSetting: (v: settings) => void;
    showMenu: boolean;
    color: string;
    handleColorChange: (color: string) => void;
};
export default function Color({
    handleClickSetting,
    handleColorChange,
    color,
}: ColorPickerProps) {
    const picker = useRef<HTMLInputElement>(null);
    return (
        <div style={{ position: "relative" }}>
            <div
                title="Color"
                onClick={() => {
                    handleClickSetting(settings.color);
                    picker.current!.click();
                }}
            >
                <div
                    className="outter-circle"
                    style={{
                        backgroundColor: color,
                        border: "3px solid #555555",
                       
                    }}
                ></div>
            </div>
            <input
                onChange={(e) => handleColorChange(e.target.value)}
                value={color}
                ref={picker}
                type="color"
                style={{
                    position:"absolute",
                    top:-30,
                    left:60,                  
                    visibility:"hidden",
                }}
            />
        </div>
    );

}
