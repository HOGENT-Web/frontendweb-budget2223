import { memo } from 'react';
import {
  IoMoonSharp,
  IoSunny,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme, themes, useThemeColors } from '../contexts/Theme.context';
import AuthenticationButton from './authentication/AuthenticationButton';

function NavItem({ label, to }) {
  const { oppositeTheme } = useThemeColors();

  return (
    <li className="nav-item">
      <Link
        to={to}
        className={`nav-link active text-${oppositeTheme}`}
      >
        {label}
      </Link>
    </li>
  );
}

export default memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth0();

  return (
    <nav className={`navbar navbar-expand-lg bg-${theme} mb-4`}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <NavItem label="Transactions" to="/" />
                <NavItem label="Places" to="/places" />
              </>
            ) : null}
          </ul>
          <div className="d-flex  align-items-center">
            <AuthenticationButton />
            <button type="button" onClick={toggleTheme}>
              {
                theme === themes.dark ? <IoMoonSharp /> : <IoSunny />
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});
