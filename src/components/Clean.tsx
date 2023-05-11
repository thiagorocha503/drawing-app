type CleanProps = { onClick: () => void };
export default function Clean({ onClick }: CleanProps) {
    return (
        <input
            id="clear"
            type="button"
            value="clear"
            onClick={() => onClick()}
            aria-label="clean paint"
            title="clean"
        />
    );
}
