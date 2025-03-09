// src/TodoFilter.js
import React from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';

function TodoFilter({ filter, setFilter }) {
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="todo filter"
        size="small"
      >
        <ToggleButton value="all" aria-label="all todos">
          Tất cả
        </ToggleButton>
        <ToggleButton value="active" aria-label="active todos">
          Chưa hoàn thành
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed todos">
          Đã hoàn thành
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default TodoFilter;