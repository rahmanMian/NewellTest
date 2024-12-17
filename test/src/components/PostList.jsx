import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]); // State for all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [userIdFilter, setUserIdFilter] = useState(""); // State for user ID filter
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // State for adding new posts
  const [editingPost, setEditingPost] = useState(null); // State for post being edited

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPosts(query, userIdFilter);
  };

  // Handle user ID filter change
  const handleUserIdChange = (e) => {
    const userId = e.target.value;
    setUserIdFilter(userId);
    filterPosts(searchQuery, userId);
  };

  // Filter posts based on search query and user ID
  const filterPosts = (query, userId) => {
    let updatedPosts = posts;

    if (query) {
      updatedPosts = updatedPosts.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
    }

    if (userId) {
      updatedPosts = updatedPosts.filter((post) => post.userId === parseInt(userId));
    }

    setFilteredPosts(updatedPosts);
  };

  // Add a new post
  const handleAddPost = () => {
    if (newPost.title && newPost.body) {
      const postToAdd = {
        id: Date.now(), // Temporary unique ID
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      };

      setPosts([postToAdd, ...posts]);
      setFilteredPosts([postToAdd, ...filteredPosts]);
      setNewPost({ title: "", body: "" });
    }
  };

  // Delete a post
  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  // Start editing a post
  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  // Save edited post
  const handleSaveEdit = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editingPost.id ? editingPost : post
    );

    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setEditingPost(null);
  };


  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "1rem" }}>Manage Posts</h1>

      {/* Search and Filter Section */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
        <select
          value={userIdFilter}
          onChange={handleUserIdChange}
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <option value="">Filter by User ID</option>
          {[...Array(10).keys()].map((id) => (
            <option key={id + 1} value={id + 1}>
              User {id + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Post Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Add New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            marginBottom: "1rem",
          }}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            marginBottom: "1rem",
          }}
        />
        <button
          onClick={handleAddPost}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          Add Post
        </button>
      </div>

      {/* Post List Section */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "1.5rem",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa",
            }}
          >
            {editingPost && editingPost.id === post.id ? (
              <>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  style={{
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                />
                <textarea
                  value={editingPost.body}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, body: e.target.value })
                  }
                  style={{
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    width: "100%",
                    height: "100px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                />
                <button
                  onClick={handleSaveEdit}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "1rem",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: "1.25rem", color: "#333" }}>{post.title}</h3>
                <p>{post.body}</p>
                <p style={{ fontStyle: "italic", color: "#888" }}>User ID: {post.userId}</p>
                <button
                  onClick={() => handleEditPost(post)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    marginRight: "1rem",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* No Results Message */}
      {filteredPosts.length === 0 && <p style={{ fontSize: "1.2rem", color: "#888" }}>No posts found.</p>}
    </div>
  );
};

export default PostList;
