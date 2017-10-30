import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <nav className="navbar is-dark" role="navigation">
        <div className="navbar-brand">
            <Link to="/" className="navbar-item">
                Muh App
            </Link>
            <Link to="/" className="navbar-item">
                home
            </Link>
            <Link to="/entity/list/truck" className="navbar-item">
                trucks
            </Link>
            <Link to="/entity/list/skill" className="navbar-item">
                skills
            </Link>
        </div>
    </nav>
)
