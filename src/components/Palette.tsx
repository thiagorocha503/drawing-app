import { ColorSchemes } from "../constants/ColorScheme";
import Color from "./Color";
import "./Palette.css"

type PaletteProps = {
    color: string;
    handleColorChange: (color: string) => void;
};
export default function Palette({color, handleColorChange }: PaletteProps) {
    return (
        <div className={`palette `} >
            {ColorSchemes.map((c) => (
                <Color key={c} onClick={handleColorChange} color={c} />
            ))}
        </div>
    );
}
