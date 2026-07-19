import { Link, NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav>
        <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/network">Network</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/buttons">OnClick examples</Link></li>
        </ul>
        <hr />
        </nav>
    );
}

export default NavBar
