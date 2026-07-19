import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import Posts from "../pages/Posts/Posts";
import PostDetails from "../pages/PostDetails/PostDetails";
import Bookmarks from "../pages/Bookmarks/Bookmarks";

function AppRoutes() {
    return (
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<ProtectedRoute>
      <Posts />
    </ProtectedRoute>} />
        <Route path="/posts/:id" element={<ProtectedRoute>
      <PostDetails />
    </ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute>
      <Bookmarks />
    </ProtectedRoute>} />
       </Routes>
    );
}

export default AppRoutes;