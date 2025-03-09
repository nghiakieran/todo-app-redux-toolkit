import { createSlice } from '@reduxjs/toolkit';

// Lấy dữ liệu ban đầu từ localStorage nếu có
const loadTodosFromStorage = () => {
  try {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

const initialState = {
  todos: loadTodosFromStorage(),
  filter: 'all', // 'all', 'active', 'completed'
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Thêm todo mới
    addTodo: (state, action) => {
      const text = action.payload;
      if (text.trim()) {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false,
        });
        // Lưu vào localStorage
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },

    // Xóa todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    // Toggle trạng thái hoàn thành
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },

    // Chỉnh sửa todo
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo && text.trim()) {
        todo.text = text;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },

    // Thay đổi filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Xóa tất cả todos đã hoàn thành
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    // Đánh dấu tất cả là hoàn thành/chưa hoàn thành
    toggleAll: (state) => {
      const areAllCompleted = state.todos.every(todo => todo.completed);
      state.todos.forEach(todo => {
        todo.completed = !areAllCompleted;
      });
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

// Export actions
export const {
  addTodo,
  deleteTodo,
  toggleComplete,
  editTodo,
  setFilter,
  clearCompleted,
  toggleAll
} = todoSlice.actions;

// Selectors
export const selectTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;

// Selector để lấy todos đã được lọc
export const selectFilteredTodos = (state) => {
  const todos = state.todos.todos;
  const filter = state.todos.filter;

  if (filter === 'active') return todos.filter(todo => !todo.completed);
  if (filter === 'completed') return todos.filter(todo => todo.completed);
  return todos; // 'all'
};

export default todoSlice.reducer;