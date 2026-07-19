import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-5 shadow bg-white">
      <h2 className="text-2xl font-semibold">
        {post.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {post.body}
      </p>

      <Link
        to={`/posts/${post.id}`}
        className="inline-block mt-4 text-blue-600 font-semibold"
      >
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;