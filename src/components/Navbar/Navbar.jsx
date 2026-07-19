import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/login");
};

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        NewsBoard
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/posts">Posts</Link>

        <Link to="/bookmarks">
          Bookmarks
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;