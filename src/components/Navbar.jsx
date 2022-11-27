import { memo } from 'react';
import {
  IoMoonSharp,
  IoSunny,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTheme, themes, useThemeColors } from '../contexts/Theme.context';

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

function NavBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar navbar-expand-lg bg-${theme} mb-4`}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavItem label="Transactions" to="/" />
            <NavItem label="Places" to="/places" />
          </ul>
          <div className="d-flex">
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
}

export default memo(NavBar);
