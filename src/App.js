import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';


function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTaskAdd = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskToggle = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        To-Do List
      </Typography>
      <TextField
        label="Nova Tarefa"
        variant="outlined"
        fullWidth
        value={task}
        onChange={handleTaskChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleTaskAdd();
          }
        }}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleTaskAdd}
        disabled={task.trim() === ''}
        fullWidth
        sx={{ mb: 2 }}
      >
        Adicionar Tarefa
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} dense button>
            <Checkbox
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
            />
            <ListItemText
              primary={task.text}
              sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
  <IconButton
    edge="end"
    onClick={() => handleTaskDelete(task.id)}
  >
    <Delete />
  </IconButton>
</ListItemSecondaryAction>

          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
