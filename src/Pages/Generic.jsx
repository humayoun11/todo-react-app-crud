import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const genericapi = 'https://66fc53c9c3a184a84d16c491.mockapi.io/genericdetails';
const todoapi = 'https://66fc5542c3a184a84d16c88e.mockapi.io/tododetail';

const Generic = () => {
  const [genericname, setgenericname] = useState('');
  const [genericslist, setgenericslist] = useState([]);
  const [editinggenericid, seteditinggenericid] = useState(null);
  const [filter, setfilter] = useState('all'); // New state for filtering
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchGenerics = async () => {
      const response = await fetch(genericapi);
      const data = await response.json();
      const usergenerics = data.filter(generic => generic.username === username);
      setgenericslist(usergenerics);
    };

    fetchGenerics();
  }, [username]);

  const handleaddgeneric = async (e) => {
    e.preventDefault();

    const allgeneric = genericslist.find(generic => generic.name.toLowerCase() === genericname.toLowerCase());
    if (allgeneric) {
      toast.error('ye generic phele sy hai');
      return;
    }

    const newgeneric = {
      name: genericname,
      username: username,
      done: false,
    };

    const response = await fetch(genericapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newgeneric),
    });

    if (response.ok) {
      const creategeneric = await response.json();
      setgenericslist([...genericslist, creategeneric]);
      toast.success('generic save hogai hai ');
      setgenericname('');
    } else {
      toast.error(' generic savenahi hui hai kuch glat hai '); // Error handling
    }
  };

  const handleedit = (id) => {
    const genericedit = genericslist.find(generic => generic.id === id);
    setgenericname(genericedit.name);
    seteditinggenericid(id);
  };

  const handleupdategeneric = async () => {
    const updategeneric = {
      name: genericname,
    };

    await fetch(`${genericapi}/${editinggenericid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updategeneric),
    });

    await updategenerictodo(editinggenericid, genericname);

    setgenericslist(genericslist.map(generic =>
      generic.id === editinggenericid ? { ...generic, name: genericname } : generic
    ));
    toast.success('generic updated hogai hai ');
    resetForm();
  };

  const updategenerictodo = async (genericid, newname) => {
    const response = await fetch(todoapi);
    const todos = await response.json();

    const todostoupdate = todos.filter(todo => todo.generic === genericslist.find(g => g.id === genericid)?.name);
    for (const todo of todostoupdate) {
      await fetch(`${todoapi}/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, generic: newname }),
      });
    }
  };

  const handlecanceledit = () => {
    resetForm();
  };

  const resetForm = () => {
    setgenericname('');
    seteditinggenericid(null);
  };

  const handleDelete = async (id) => {
    const response = await fetch(todoapi);
    const todos = await response.json();

    const usedIntodo = todos.some(todo => todo.generic === genericslist.find(g => g.id === id)?.name);

    if (usedIntodo) {
      toast.error(' phele sub todo delet kro jahan is generic sy todo save hai ');
      return;
    }

    await fetch(`${genericapi}/${id}`, {
      method: 'DELETE',
    });
    setgenericslist(genericslist.filter(generic => generic.id !== id));
  };

  const handleDone = async (id) => {
    const updategeneric = {
      done: true,
    };

    await fetch(`${genericapi}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updategeneric),
    });

    setgenericslist(genericslist.map(generic =>
      generic.id === id ? { ...generic, done: true } : generic
    ));
  };

  // Filtered generics based on the selected option
  const filteredGenerics = genericslist.filter(generic => {
    if (filter === 'done') return generic.done;
    if (filter === 'undone') return !generic.done;
    return true; // Show all by default
  });

  return (
    <div>
      <ToastContainer />
      <h2>Generic</h2>

      <div className="mb-3">
        <label htmlFor="filter" className="form-label">filter kro status sy</label>
        <select id="filter" className="form-select" value={filter} onChange={(e) => setfilter(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </div>

      <form onSubmit={editinggenericid ? (e) => { e.preventDefault(); handleupdategeneric(); } : handleaddgeneric}>
        <div className="mb-3">
          <label htmlFor="genericName" className="form-label">Generic Name</label>
          <input
            type="text"
            id="genericName"
            value={genericname}
            onChange={(e) => setgenericname(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {editinggenericid ? (
          <>
            <button type="button" onClick={handleupdategeneric} className="btn btn-primary">Update</button>
            <button type="button" onClick={handlecanceledit} className="btn btn-secondary ms-2">Cancel</button>
          </>
        ) : (
          <button type="submit" className="btn btn-primary">Add Generic</button>
        )}
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Generic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredGenerics.map(generic => (
            <tr key={generic.id}>
              <td>{generic.id}</td>
              <td>{generic.name}</td>
              <td>
                {!generic.done ? (
                  <>
                    <button onClick={() => handleedit(generic.id)} className="btn btn-warning btn-sm me-2">Edit</button>
                    <button onClick={() => handleDelete(generic.id)} className="btn btn-danger btn-sm me-2">Delete</button>
                    <button onClick={() => handleDone(generic.id)} className="btn btn-success btn-sm">Done</button>
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

export default Generic;
