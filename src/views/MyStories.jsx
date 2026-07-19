import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebase";

import "../styling/dashboard.css";

function MyStories() {
  const [stories, setStories] = useState([]);
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this story?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "stories", id));

    setStories(
      stories.filter((story) => story.id !== id)
    );

    alert("🗑 Story deleted successfully!");

  } catch (error) {

    alert(error.message);

  }

};

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          return;
        }

        const q = query(
          collection(db, "stories"),
          where("writerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const storyList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStories(storyList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="dashboard-page">
      <main className="dashboard-content">
        <h1>📚 My Stories</h1>

        {stories.length === 0 ? (
          <p>You haven't published any stories yet.</p>
        ) : (
          <div className="stories-grid">
            {stories.map((story) => (
              <div className="stat-card" key={story.id}>
                <h2>{story.title}</h2>

                <p>Category: {story.category}</p>

                <p>Language: {story.language}</p>

                <Link to={`/edit-story/${story.id}`}>
  <button>
    ✏ Edit
  </button>
</Link>

               <button
  onClick={() => handleDelete(story.id)}
>
  🗑 Delete
</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyStories;