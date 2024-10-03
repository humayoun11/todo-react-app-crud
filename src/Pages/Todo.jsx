import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const todoapi = 'https://66fc5542c3a184a84d16c88e.mockapi.io/tododetail';
const genericapi = 'https://66fc53c9c3a184a84d16c491.mockapi.io/genericdetails';

const Todo = () => {
    const [tododetail, settododetail] = useState('');
    const [selectedGeneric, setSelectedGeneric] = useState('');
    const [tododate, settododate] = useState('');
    const [genericslist, setgenericslist] = useState([]);
    const [todoslist, settodoslist] = useState([]);
    const [editingtodoid, seteditingtodoid] = useState(null);

    const username = sessionStorage.getItem('username');

    useEffect(() => {
        const generics = async () => {
            const response = await fetch(genericapi);
            const data = await response.json();
            const usergeneric = data.filter(generic => generic.username === username);
            setgenericslist(usergeneric);
        };

        const todos = async () => {
            const response = await fetch(todoapi);
            const data = await response.json();
            const userTodos = data.filter(todo => todo.username === username);
            settodoslist(userTodos);
        };

        generics();
        todos();
    }, [username]);

    const handleaddtodo = async (e) => {
        e.preventDefault();
        const today = new Date();
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 2);

        if (new Date(tododate) > maxDate) {
            toast.error('ap sirf 2 din agy ka todo save kr sakty hain ');
            return;
        }

        const newtodo = {
            detail: tododetail,
            generic: selectedGeneric,
            date: tododate,
            username: username,
            done: false, // Initialize as undone
        };

        const response = await fetch(todoapi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newtodo),
        });

        if (response.ok) {
            const createdTodo = await response.json();
            settodoslist([...todoslist, createdTodo]);
            toast.success('todo save hogaya hai ');
            resetform();
        } else {
            toast.error('todo save nahi howa hai');
        }
    };

    const handleedit = async (id) => {
        const todoToEdit = todoslist.find(todo => todo.id === id);
        settododetail(todoToEdit.detail);
        setSelectedGeneric(todoToEdit.generic);
        settododate(todoToEdit.date);
        seteditingtodoid(id);
    };

    const handleupdatetodo = async () => {
        const updatedtodo = {
            detail: tododetail,
            generic: selectedGeneric,
            date: tododate,
        };

        await fetch(`${todoapi}/${editingtodoid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedtodo),
        });

        settodoslist(todoslist.map(todo =>
            todo.id === editingtodoid ? { ...todo, ...updatedtodo } : todo
        ));
        toast.success('todo update hogaya hai chalo ab niklo');
        resetform();
    };

    const handlecanceledit = () => {
        resetform();
    };

    const resetform = () => {
        settododetail('');
        setSelectedGeneric('');
        settododate('');
        seteditingtodoid(null);
    };

    const handledelete = async (id) => {
        await fetch(`${todoapi}/${id}`, {
            method: 'DELETE',
        });
        settodoslist(todoslist.filter(todo => todo.id !== id));
    };

    const handledone = async (id) => {
        const updatedtodo = {
            done: true,
        };

        await fetch(`${todoapi}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedtodo),
        });

        settodoslist(todoslist.map(todo =>
            todo.id === id ? { ...todo, done: true } : todo
        ));
    };

    return (
        <div>
            <ToastContainer />
            <h2>Todo</h2>
            <form onSubmit={editingtodoid ? (e) => { e.preventDefault(); handleupdatetodo(); } : handleaddtodo}>
                <div className="mb-3">
                    <label htmlFor="todoDetail" className="form-label">Todo Detail</label>
                    <input
                        type="text"
                        id="todoDetail"
                        value={tododetail}
                        onChange={(e) => settododetail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genericSelect" className="form-label">Select Generic</label>
                    <select
                        id="genericSelect"
                        value={selectedGeneric}
                        onChange={(e) => setSelectedGeneric(e.target.value)}
                        required
                        className="form-select"
                    >
                        <option value="">Select a generic</option>
                        {genericslist.map(generic => (
                            <option key={generic.id} value={generic.name}>{generic.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="todoDate" className="form-label">Todo Date</label>
                    <input
                        type="date"
                        id="todoDate"
                        value={tododate}
                        onChange={(e) => settododate(e.target.value)}
                        required
                        className="form-control"
                        min={new Date().toISOString().split("T")[0]}
                    />
                </div>
                {editingtodoid ? (
                    <>
                        <button type="button" onClick={handleupdatetodo} className="btn btn-primary">Update</button>
                        <button type="button" onClick={handlecanceledit} className="btn btn-secondary ms-2">Cancel</button>
                    </>
                ) : (
                    <button type="submit" className="btn btn-primary">Add Todo</button>
                )}
            </form>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Todo Detail</th>
                        <th>Generic</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todoslist.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.detail}</td>
                            <td>{todo.generic}</td>
                            <td>{todo.date}</td>
                            <td>
                                {!todo.done ? (
                                    <>
                                        <button onClick={() => handleedit(todo.id)} className="btn btn-warning btn-sm me-2">Edit</button>
                                        <button onClick={() => handledelete(todo.id)} className="btn btn-danger btn-sm me-2">Delete</button>
                                        <button onClick={() => handledone(todo.id)} className="btn btn-success btn-sm">Done</button>
                                    </>
                                ) : (
                                    <span>Done</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Todo;
