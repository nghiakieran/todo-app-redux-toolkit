// src/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Typography, Box, Button } from '@mui/material';
import TodoItem from '../TodoItem/TodoItem';
import { selectFilteredTodos, selectTodos, clearCompleted, toggleAll } from '../../store/todoSlice';

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const allTodos = useSelector(selectTodos);

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const handleToggleAll = () => {
    dispatch(toggleAll());
  };

  if (allTodos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Không có công việc nào. Hãy thêm công việc mới!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleToggleAll}
        >
          {allTodos.every(todo => todo.completed)
            ? 'Bỏ đánh dấu tất cả'
            : 'Đánh dấu tất cả'}
        </Button>

        {allTodos.some(todo => todo.completed) && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleClearCompleted}
          >
            Xóa đã hoàn thành
          </Button>
        )}
      </Box>

      {filteredTodos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Không có công việc nào phù hợp với bộ lọc.
          </Typography>
        </Box>
      ) : (
        <List>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      )}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {allTodos.filter(todo => !todo.completed).length} công việc chưa hoàn thành
        </Typography>
      </Box>
    </>
  );
}

export default TodoList;