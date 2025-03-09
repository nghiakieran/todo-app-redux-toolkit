// src/TodoFilter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { setFilter, selectFilter } from '../../store/todoSlice';

function TodoFilter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
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