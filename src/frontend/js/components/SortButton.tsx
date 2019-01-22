import * as React from 'react';

export const SortButton = ({
  sortOrder,
  onClick,
}: {
  sortOrder: string,
  onClick: () => void
}) => (
  <button
    onClick={onClick}
  >
    { !sortOrder && '↕' }
    { sortOrder === 'asc' && '↓' }
    { sortOrder === 'desc' && '↑' }
  </button>
);
