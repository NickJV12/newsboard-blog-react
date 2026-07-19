import { useContext } from "react";
import { BookmarkContext } from "../../context/BookmarkContext";
import PostCard from "../../components/PostCard/PostCard";
import Navbar from "../../components/Navbar/Navbar";

function Bookmarks() {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Bookmarked Posts
      </h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookmarks.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Bookmarks;