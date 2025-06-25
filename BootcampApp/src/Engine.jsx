export default function Engine({ cubics, setCubics }) {
    return (
        <div>
            <label>Engine cubics: </label>
            <input
                type="number" min = "0"
                value={cubics}
                onChange={e => setCubics(e.target.value)}
            />
        </div>
    );
}