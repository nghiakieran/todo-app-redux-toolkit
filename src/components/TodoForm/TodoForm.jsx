// src/TodoForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { addTodo } from '../../store/todoSlice';
import { AddIcCallOutlined } from '@mui/icons-material';

function TodoForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Thêm công việc mới"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text.trim()}
          startIcon={<AddIcCallOutlined />}
        >
          Thêm
        </Button>
      </Box>
    </Box>
  );
}

export default TodoForm;