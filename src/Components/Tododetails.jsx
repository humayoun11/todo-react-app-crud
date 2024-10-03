import React from "react";
import { NavLink } from 'react-router-dom';
import Tododetail from "../ArraysFiles/Tododetails";




const Tododetails = () => {
  return (
    <div className="container">
      <h2 className="my-4 text-center">todo qualities</h2>
      <div className="row">
        {Tododetail.map((todos) => (
          <div key={todos.id} className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%', height: '450px' }}>
              <img
                src={todos.imageUrl}
                className="card-img-top"
                alt={todos.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{todos.name}</h5>
                <p className="card-text">{todos.description}</p>

                <NavLink to="/LoginRegistor" className="btn btn-primary">View Details</NavLink >
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tododetails;



