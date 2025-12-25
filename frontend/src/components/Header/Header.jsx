import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">💰</span>
                    SmartFinance
                </Link>

                <nav className="nav-links">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/transactions"
                        className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
                    >
                        Transactions
                    </Link>

                    {user ? (
                        <div className="user-menu">
                            <span className="user-name">👤 {user.username}</span>
                            <button onClick={logout} className="btn-logout">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
