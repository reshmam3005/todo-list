import React, { useState } from 'react';
import './App.css'; // Import your CSS file

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [currentTab, setCurrentTab] = useState('todo');
  const [timer, setTimer] = useState(null);

  const handleAddTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
    setInputValue('');
  };

  const handleToggleCompleted = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: true } : todo
    );
    const todoToMoveToHistory = todos[index];
    setTodos(updatedTodos);
    const newTimer = setTimeout(() => {
      setHistory([...history, todoToMoveToHistory]);
      setTodos(todos.filter((t) => t !== todoToMoveToHistory));
    }, 600);
     setTimer(newTimer);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === 'history' && timer) {
      clearTimeout(timer);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(inputValue);
    }
  };

  const handleAddButtonClick = () => {
    if (inputValue !== '') {
      handleAddTodo(inputValue);
    }
  };

  return (
    <div className='design'>
      <h1>Todo List</h1>
      {currentTab === 'todo' && (
        <div>
          <input
            type='text'
            placeholder='My todos for today'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddButtonClick}>ADD</button>
        </div>
      )}
      <div>
        <button onClick={() => handleTabChange('todo')}>Todo</button>
        <button onClick={() => handleTabChange('history')}>History</button>
      </div>
      {currentTab === 'todo' && (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => handleToggleCompleted(index)}
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      )}

      {currentTab === 'history' && (
        <ul>
          {history.map((todo, index) => (
            <li key={index}>{todo.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
