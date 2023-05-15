export default function Eraser({
    onClick,
    active,
}: {
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button title="Eraser (E)" type="button" onClick={() => onClick()} className="eraser-tool">
            <svg
                width={30}
                fill={active ? "black" : "grey"}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96a48.004 48.004 0 0 0 33.942 14.059h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-144.117zm-302.627-62.627 137.373 137.373-67.314 67.313h-114.745l-80-80z" />
            </svg>
        </button>
    );
}
