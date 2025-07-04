import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Media Reviews</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to="/create-review">Create Review</Link>
                        </li>

                        <li>
                            <Link to="/my-reviews">My Reviews</Link>
                        </li>

                        <li>
                            <Link to="/profile">Welcome {user.username}</Link>
                        </li>
                        <li>
                            <button className="btn" onClick={onLogout}>
                                Logout
                            </button>
                        </li>

                    </>


                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>

                )}
            </ul>
        </header>

    );
}

export default Header;