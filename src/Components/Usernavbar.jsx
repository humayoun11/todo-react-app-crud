import { Link } from 'react-router-dom';
import React from 'react';
import { useUserContext } from '../UserContext';

const UserNavbar = () => {
    const { setIsLoggedIn } = useUserContext();

    const handleLogout = () => {
        setIsLoggedIn(false); // Reset login state
        sessionStorage.removeItem('username'); // Clear username
        sessionStorage.removeItem('userId'); // Clear user ID
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/User/Generic" className="nav-link">Generic</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/User/Todo" className="nav-link">Todo</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserNavbar;
