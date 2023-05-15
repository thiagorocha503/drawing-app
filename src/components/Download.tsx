import { useState } from "react";
import "./Download.css";
import { RefObject } from "react";
import { Shapes } from "../types/shapes";

export default function Download({
    canvas,
    histories,
    downloadRef: ref,
}: {
    canvas: HTMLCanvasElement | null;
    histories: Shapes[];
    downloadRef: RefObject<HTMLAnchorElement>;
}) {
    const [color, setColor] = useState("gray");
    return (
        <a
            ref={ref}
            title="Download (Ctrl+S)"
            href={canvas?.toDataURL("image/png")}
            className={`download  ${histories.length > 0 ? "show" : "hide"}`}
            onMouseOut={() => setColor("grey")}
            onMouseOver={() => setColor("black")}
            download={"canvas.png"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                fill={color}
            >
                <path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z" />
            </svg>
        </a>
    );
}
