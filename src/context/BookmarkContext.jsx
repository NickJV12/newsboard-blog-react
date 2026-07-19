import { createContext, useEffect, useState } from "react";

export const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarks)
    );
  }, [bookmarks]);

  const addBookmark = (post) => {
    const alreadyBookmarked = bookmarks.some(
      (item) => item.id === post.id
    );

    if (!alreadyBookmarked) {
      setBookmarks([...bookmarks, post]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarks(
      bookmarks.filter((post) => post.id !== id)
    );
  };

  const isBookmarked = (id) => {
    return bookmarks.some((post) => post.id === id);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;