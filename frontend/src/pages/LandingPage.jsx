import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>SmartFinance</h1>
                    <p className="hero-subtitle">Take Control of Your Financial Future</p>
                    <p className="hero-description">
                        Track your income and expenses, visualize your spending patterns,
                        and make smarter financial decisions with our intuitive dashboard.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">Get Started Free</Link>
                        <Link to="/login" className="btn btn-secondary">Sign In</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose SmartFinance?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Visual Dashboard</h3>
                        <p>Get a clear overview of your income, expenses, and balance at a glance with interactive charts.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Expense Analytics</h3>
                        <p>Understand your spending patterns with beautiful pie charts showing expense breakdown by category.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Easy Tracking</h3>
                        <p>Add income and expenses quickly with our simple interface. Categorize and filter transactions easily.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure & Private</h3>
                        <p>Your financial data is protected with industry-standard encryption and secure authentication.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3>Date Filtering</h3>
                        <p>Filter your transactions by custom date ranges to analyze your spending over any period.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🇸🇦</div>
                        <h3>SAR Currency</h3>
                        <p>Built with Saudi Riyal (SAR) support for seamless local currency tracking.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <h2>Ready to Start Managing Your Finances?</h2>
                <p>Join thousands of users who trust SmartFinance for their financial tracking.</p>
                <Link to="/register" className="btn btn-primary btn-large">Create Free Account</Link>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2024 SmartFinance. Built by Ahmed Ramadan.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
