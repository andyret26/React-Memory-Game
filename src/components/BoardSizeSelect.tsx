import "./BoardSizeSelect.css";

interface PageProps {
  selectedBoardSize: number;
  onSelectBoardSize: (value: string) => void;
}
export default function BoardSizeSelect({
  selectedBoardSize,
  onSelectBoardSize,
}: PageProps) {
  return (
    <div className="grid-size">
      <label className="label" htmlFor="grid-size-select">
        Select Board Size:
      </label>
      <select
        className="grid-size-select"
        value={selectedBoardSize}
        onChange={(event) => onSelectBoardSize(event.target.value)}
      >
        <option value={4}>2 x 2</option>
        <option value={16}>4 x 4</option>
        <option value={36}>6 x 6</option>
      </select>
    </div>
  );
}
