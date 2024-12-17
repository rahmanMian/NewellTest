import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]); // State for the list of posts
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // State for new post input
  const [editingPost, setEditingPost] = useState(null); // State for editing a post

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data.slice(0, 10)); // Fetch only the first 10 posts for simplicity
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Add a new post
  const handleAddPost = () => {
    if (newPost.title && newPost.body) {
      const postToAdd = {
        id: Date.now(), // Temporary unique ID
        title: newPost.title,
        body: newPost.body,
      };

      setPosts([ postToAdd, ...posts]); // Update posts state
      setNewPost({ title: "", body: "" }); // Reset input fields
    }
  };

  // Delete a post
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id)); // Remove the post with matching ID
  };

  // Edit a post
  const handleEditPost = (post) => {
    setEditingPost(post); // Set the post to be edited
    setNewPost({ title: post.title, body: post.body }); // Populate input fields with current values
  };

  // Save edited post
  const handleSaveEdit = () => {
    setPosts(
      posts.map((post) =>
        post.id === editingPost.id
          ? { ...post, title: newPost.title, body: newPost.body }
          : post
      )
    );

    setEditingPost(null); // Clear editing state
    setNewPost({ title: "", body: "" }); // Reset input fields
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Manage Posts</h1>

      {/* Input fields for adding/editing a post */}
      <div>
        <h3>{editingPost ? "Edit Post" : "Add New Post"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          style={{ marginRight: "1rem", padding: "0.5rem" }}
        />
        {editingPost ? (
          <button onClick={handleSaveEdit} style={{ padding: "0.5rem 1rem" }}>
            Save Edit
          </button>
        ) : (
          <button onClick={handleAddPost} style={{ padding: "0.5rem 1rem" }}>
            Add Post
          </button>
        )}
      </div>

      {/* List of posts */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button
              onClick={() => handleEditPost(post)}
              style={{ marginRight: "0.5rem", padding: "0.3rem 0.8rem" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeletePost(post.id)}
              style={{ padding: "0.3rem 0.8rem", backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
