import { Box, List, Typography } from '@mui/material'
import React from 'react'
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo, }) {

  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Không có công việc nào. Hãy thêm công việc mới!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {todos.map(todo => {
        return <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      })}
    </List>
  )
}

export default TodoList