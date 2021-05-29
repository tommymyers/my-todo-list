import React from "react";

interface SortByProps {
  newestFirst: boolean;
  onChange?: (newestFirst: boolean) => void;
}

const SortBy: React.FC<SortByProps> = ({newestFirst, onChange }) => {
  return (
    <div>
      Sort by:
      <button
        onClick={() => {
          if (onChange) onChange(!newestFirst);
        }}
      >
        {newestFirst ? "Newest first" : "Oldest first"}
      </button>
    </div>
  );
};

export default SortBy;
