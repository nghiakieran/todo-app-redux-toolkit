// src/TodoItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  ListItemSecondaryAction,
  ListItemIcon,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteTodo, toggleComplete, editTodo } from '../../store/todoSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggleComplete = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    dispatch(editTodo({
      id: todo.id,
      text: editText
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <ListItem
      dense
      divider
      sx={{
        bgcolor: todo.completed ? 'action.hover' : 'background.paper',
        borderRadius: 1,
        mb: 1,
        flexDirection: isEditing ? 'column' : 'row',
        alignItems: isEditing ? 'flex-start' : 'center',
      }}
    >
      {isEditing ? (
        <Box sx={{ width: '100%', mt: 1 }}>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            autoFocus
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
            <IconButton onClick={handleSave} disabled={!editText.trim()} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="error">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={handleToggleComplete}
              color="primary"
            />
          </ListItemIcon>

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
            <IconButton edge="end" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default TodoItem;