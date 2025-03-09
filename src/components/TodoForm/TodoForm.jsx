// src/TodoForm.js
import React, { useRef, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
    inputRef.current.focus()
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="outlined"
          size="small"
          label="Thêm công việc mới"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          sx={{ flexShrink: 0 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!text.trim()}
          startIcon={<AddIcon />}
        >
          Thêm
        </Button>
      </Box>
    </Box>
  );
}

export default TodoForm;