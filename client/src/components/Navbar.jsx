import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
        {/* Logo links to Home */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600 mr-8">
          Job Miner
        </NavLink>

        {/* Nav items aligned left near the logo */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'hover:text-blue-600'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'hover:text-blue-600'
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'hover:text-blue-600'
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'text-blue-600' : 'hover:text-blue-600'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
