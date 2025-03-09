// src/TodoItem.js
import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  ListItemSecondaryAction,
  ListItemIcon
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  return (
    <ListItem
      dense
      divider
      sx={{
        bgcolor: todo.completed ? 'action.hover' : 'background.paper',
        borderRadius: 1,
        mb: 1
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          color="primary"
        />
      </ListItemIcon>

      {isEditing ? (
        <>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            autoFocus
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={handleSave} disabled={!editText.trim()}>
              <SaveIcon />
            </IconButton>
            <IconButton edge="end" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      ) : (
        <>
          <ListItemText
            primary={todo.text}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary'
            }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={handleEdit} disabled={todo.completed}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default TodoItem;