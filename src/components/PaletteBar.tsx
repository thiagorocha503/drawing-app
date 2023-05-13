import { ColorSchemes } from "../constants/ColorScheme";
import Color from "./Color";
import "./PaletteBar.css"

type PaletteToolbarProps = {
    color: string;
    handleColorChange: (color: string) => void;
};
export default function PaletteToolbar({color, handleColorChange }: PaletteToolbarProps) {
    return (
        <div className={`palette `} >
            {ColorSchemes.map((c) => (
                <Color key={c} onClick={handleColorChange} color={c} />
            ))}
        </div>
    );
}
