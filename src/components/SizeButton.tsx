import {
    MAX_BRUSH_SIZE,
    MAX_ERASER_SIZE,
} from "../constants/input";
import { settings } from "../types/settings";
import { tool } from "../types/tool";
import SizeMenu from "./SizeMenu";

type SizeButtonProps = {
    mode: tool;
    currentSize: number;
    showMenu: boolean;
    handleClickSetting: (s: settings) => void;
    handleChangeSize: (value: number) => void;
};
export default function SizeButton({
    mode,
    showMenu,
    currentSize,
    handleChangeSize,
    handleClickSetting,
}: SizeButtonProps) {
    const w =
        (85 * currentSize) /
        (mode === tool.Paint ? MAX_BRUSH_SIZE : MAX_ERASER_SIZE);
    return (
        <div style={{ position: "relative" }}>
            <div
                className="outter-circle"
                onClick={(e) => {
                    e.preventDefault();
                    handleClickSetting(settings.size);
                }}
                title="Size"
            >
                <div
                    className="inner-circle"
                    style={{
                        width: `${w}%`,
                        height: `${w}%`,
                        border: "3px solid #202020",
                    }}
                ></div>
            </div>
            {showMenu && (
                <SizeMenu
                    currentSize={currentSize}
                    handleChangeSize={handleChangeSize}
                    mode={mode}
                />
            )}
        </div>
    );
}
