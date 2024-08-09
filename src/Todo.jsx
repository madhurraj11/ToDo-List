import React, {useState} from 'react'
import './Todo.css';

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const addTodo = () => {
        if(inputValue.trim() !== ''){
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            }

            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    }

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id!== id);
        setTodos(updatedTodos);
    }

    const enterEditMode = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditText(text);

    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === editId){
                return {...todo, text: editText}
            }
            return todo; 
        })
        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditText('');
    }
  return (
    <div className='todo_container'>
        <h2>TODO List</h2>
        <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/> 
        {
            editMode ? (
                <div>
                <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}/> 
                <button onClick={updateTodo}>Update</button>
                </div>
             ) : (
                <button onClick={addTodo}>Add</button>
             )
        }
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.text}
                    <div className='btn-container'>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    <button onClick={() => enterEditMode(todo.id, todo.text)}>Edit</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default Todo;