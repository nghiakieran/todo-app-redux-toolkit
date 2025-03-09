// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoFilter from '../TodoFilter/TodoFilter';

function TodoApp() {
  // Bước 1: Tạo state cho danh sách todos
  const [todos, setTodos] = useState(() => {
    // Lấy dữ liệu từ localStorage nếu có
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Bước 2: Tạo state cho filter
  const [filter, setFilter] = useState('all');

  // Bước 3: Lưu todos vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Bước 4: Thêm todo mới
  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Bước 5: Xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Bước 6: Toggle trạng thái hoàn thành
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Bước 7: Chỉnh sửa todo
  const editTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  };

  // Bước 8: Lọc todos theo filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Bước 9: Xoa tat ca cac nut da hoan thanh
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Buoc 10:
  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed); 
    setTodos(todos.map(todo => ({ ...todo, completed: !areAllCompleted })));
  }; 
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>

        <TodoForm addTodo={addTodo} />

        <TodoFilter filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        {todos.some(todo => todo.completed) && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={clearCompleted}
            >
              Xóa đã hoàn thành
            </Button>
          </Box>
        )}

        {todos.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={toggleAll}
            >
              {todos.every(todo => todo.completed)
                ? 'Đánh dấu tất cả chưa hoàn thành'
                : 'Đánh dấu tất cả hoàn thành'}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default TodoApp;