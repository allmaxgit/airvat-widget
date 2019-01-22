import * as React from 'react';
import * as classNames from 'classnames';

export const SortButton = ({
  sortOrder,
  onClick,
}: {
  sortOrder: string,
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={classNames({ active: !!sortOrder })}
  >
    { !sortOrder && '↕' }
    { sortOrder === 'asc' && '↓' }
    { sortOrder === 'desc' && '↑' }
  </button>
);
