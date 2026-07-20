import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

import "../styling/dashboard.css";

function MyStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (!auth.currentUser) return;

        const q = query(
          collection(db, "stories"),
          where("writerId", "==", auth.currentUser.uid)
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

                <p>
                  <strong>Category:</strong> {story.category}
                </p>

                <p>
                  <strong>Language:</strong> {story.language}
                </p>

                <div className="story-actions">
                  <Link to={`/edit-story/${story.id}`}>
                    <button>Edit</button>
                  </Link>

                  <Link to={`/add-chapter/${story.id}`}>
                    <button>Add Chapter</button>
                  </Link>

                  <button>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyStories;