import React from "react";
interface PageProps {
  selectedBoardSize: number;
  onSelectBoardSize: (value: string) => void;
}
export default function BoardSizeSelect({
  selectedBoardSize,
  onSelectBoardSize,
}: PageProps) {
  return (
    <div>
      <label htmlFor="grid-size-select">Select grid size:</label>
      <select
        id="grid-size-select"
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
