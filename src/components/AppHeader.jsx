import { Activity } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function AppHeader({ active = 'incidents', connection }) {
    return (
        <header className="app-topbar">
            <Link to="/" className="brand-lockup">
                <span className="brand-mark"><Activity size={19} /></span>
                <span className="brand-copy">
                    <strong>Signal / Response</strong>
                    <small>OPERATIONS CENTER</small>
                </span>
            </Link>
            <nav className="app-nav" aria-label="Main navigation">
                <NavLink to="/" end className={active === 'incidents' ? 'is-active' : ''}>Incidents</NavLink>
                <NavLink to="/memory" className={active === 'memory' ? 'is-active' : ''}>Memory</NavLink>
            </nav>
            {connection && (
                <div className={`connection-state connection-${connection}`}>
                    <span className="connection-dot" />
                    {connection === 'checking' ? 'Checking API' : connection === 'offline' ? 'API offline' : 'API connected'}
                </div>
            )}
        </header>
    );
}

export default AppHeader;