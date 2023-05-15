import { useState } from "react";
import "./Clean.css";
import { Shapes } from "../types/shapes";
type CleanProps = {
    onClick: () => void;
    drawing: boolean;
    histories: Shapes[];
};

export default function Clean({ onClick, drawing, histories }: CleanProps) {
    const [color, setColor] = useState("gray");
    return (
        <button
            className={
                "clean " +
                (drawing ? "hide" : histories.length === 0 ? "hide" : "show")
            }
            onClick={() => onClick()}
            type="button"
            aria-label="clean paint"
            title="Clean (Delete)"
            onMouseOver={() => setColor("black")}
            onMouseLeave={() => setColor("grey")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={color}
                viewBox="0 96 960 960"
                width="48"
            >
                <path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z" />
            </svg>
        </button>
    );
}
