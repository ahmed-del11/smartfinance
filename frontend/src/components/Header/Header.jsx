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
                <Link to="/dashboard" className="logo">
                    <img src="/logo.svg" alt="SmartFinance" className="logo-img" />
                    SmartFinance
                </Link>

                <nav className="nav-links">
                    <Link
                        to="/dashboard"
                        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
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
