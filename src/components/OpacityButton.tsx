import { settings } from "../types/settings";
import OpacityMenu from "./OpacityMenu";

type OpacityButtonProps = {
    opacity: number;
    showMenu: boolean;
    handleClickSetting: (s: settings) => void;
    handleOpacityChange: (v: number) => void;
};
export default function OpacityButton({
    opacity,
    showMenu: showOpacityMenu,
    handleOpacityChange,
    handleClickSetting,
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
                onClick={() => handleClickSetting(settings.opacity)}
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
            {showOpacityMenu && (
                <OpacityMenu
                    handleOpacityChange={handleOpacityChange}
                    opacity={opacity}
                />
            )}
        </div>
    );
}
