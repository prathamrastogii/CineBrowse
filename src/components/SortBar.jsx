import React from "react";
import "../css/SortBar.css"

function SortBar({ sortOption, onSortChange }) {
  return (
    <div className="sort-bar">
      <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort by</option>
        <option value="rating">Rating (Highest First)</option>
        <option value="popularity">Popularity</option>
        <option value="vote">Vote Count</option>
        <option value="year-desc">Year :Newest → Oldest</option>
        <option value="year-asc">Year :Oldest → Newest</option>
      </select>
    </div>
  );
}

export default SortBar