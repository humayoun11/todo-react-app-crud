import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import { UserProvider, useUserContext } from './UserContext';

import Home from './Pages/Home';
import LoginRegistor from "./Pages/LoginRegistor";
import Login from "./Pages/Login";
import Registor from "./Pages/Registor";
import Navbar from './Components/Navbar'; // Normal Navbar
import UserNavbar from '../src/Components/Usernavbar'; // User Navbar
import Generic from "./Pages/Generic";
import Todo from "./Pages/Todo";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <MainContent />
            </BrowserRouter>
        </UserProvider>
    );
}

const MainContent = () => {
    const { isLoggedIn, setIsLoggedIn } = useUserContext();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        if (username && userId) {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    return (
        <>
            {isLoggedIn ? <UserNavbar /> : <Navbar />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/User/Generic" element={<Generic />} />
                        <Route path="/User/Todo" element={<Todo />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/loginRegistor" element={<LoginRegistor />} >
                            <Route path="login" element={<Login />} />
                            <Route path="registor" element={<Registor />} />
                        </Route>
                    </>
                )}
            </Routes>
        </>
    );
};

export default App;
