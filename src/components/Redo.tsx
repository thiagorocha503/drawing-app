import "./Redo.css";
import { Shapes } from "../types/shapes";
import { useState } from "react";
export default function Redo({
    currentHistory,
    drawing,
    histories,
    handleRedo,
}: {
    handleRedo: () => void;
    histories: Shapes[];
    currentHistory: number;
    drawing: boolean;
}) {
    const [color, setColor] = useState("gray");
    return (
        <button
            onClick={() => handleRedo()}
            onMouseOut={() => setColor("grey")}
            onMouseOver={() => setColor("black")}
            title="redo"
            className={
                "redo " +
                (!drawing && currentHistory + 1 < histories.length
                    ? "show"
                    : "hide")
            }
            type="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                fill={color}
            >
                <path d="M392 856q-95 0-163.5-64T160 634q0-94 68.5-158T392 412h294L572 298l42-42 186 186-186 186-42-42 114-114H391q-70 0-120.5 46.5T220 634q0 69 50.5 115.5T391 796h289v60H392Z" />
            </svg>
        </button>
    );
}
