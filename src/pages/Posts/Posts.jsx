import { useEffect, useState } from "react";
import { getPosts } from "../../services/postService";
import PostCard from "../../components/PostCard/PostCard";
import useDebounce from "../../hooks/useDebounce";

function Posts() {
  // Stores all posts received from the API
  const [posts, setPosts] = useState([]);

  // Loading state while fetching posts
  const [loading, setLoading] = useState(true);

  // Error message if API request fails
  const [error, setError] = useState("");

  // Search input value
  const [search, setSearch] = useState("");

  // Sorting order
  const [sortOrder, setSortOrder] = useState("asc");

  // Debounced search value (500ms delay)
  const debouncedSearch = useDebounce(search, 500);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.posts);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Unable to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when page loads
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  // Filter posts based on search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Sort filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    }

    return b.title.localeCompare(a.title);
  });

  // Loading UI
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading Posts...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Posts
      </h1>

      {/* Search and Sorting */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Title A-Z</option>
          <option value="desc">Title Z-A</option>
        </select>
      </div>

      {/* No Posts Found */}
      {sortedPosts.length === 0 ? (
        <div className="text-center text-gray-600">
          No posts found.
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;