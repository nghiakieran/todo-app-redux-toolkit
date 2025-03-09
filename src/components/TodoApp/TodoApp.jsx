// src/TodoApp.js
import { Container, Typography, Paper } from '@mui/material';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import TodoFilter from '../TodoFilter/TodoFilter';

function TodoApp() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todo List
        </Typography>

        <TodoForm />

        <TodoFilter />

        <TodoList />
      </Paper>
    </Container>
  );
}

export default TodoApp;