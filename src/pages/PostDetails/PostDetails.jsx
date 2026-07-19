import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import Navbar from "../../components/Navbar/Navbar";

import {
  getPostById,
  getCommentsByPost,
} from "../../services/postService";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    addBookmark,
    removeBookmark,
    isBookmarked,
} = useContext(BookmarkContext);

  const fetchPost = async () => {
    try {
      const postData = await getPostById(id);

      const commentsData =
        await getCommentsByPost(id);

      setPost(postData);

      setComments(commentsData.comments);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Post not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPost();
  }, [id]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-600">
        {error}
      </h2>
    );
  }

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {post.title}
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        {post.body}
      </p>
      
       <button
    onClick={() =>
        isBookmarked(post.id)
            ? removeBookmark(post.id)
            : addBookmark(post)
    }
    className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
     >
    {isBookmarked(post.id)
        ? "Remove Bookmark"
        : "Bookmark"}
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        Comments
      </h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <p className="font-semibold">
              {comment.user.username}
            </p>

            <p className="text-gray-600 mt-2">
              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default PostDetails;