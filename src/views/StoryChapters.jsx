import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import "../styling/dashboard.css";

function StoryChapters() {
  const { storyId } = useParams();

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const q = query(
  collection(db, "chapters"),
  where("storyId", "==", storyId)
);

        const snapshot = await getDocs(q);

        const chapterList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        chapterList.sort(
  (a, b) => a.chapterNumber - b.chapterNumber
);

        setChapters(chapterList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChapters();
  }, [storyId]);

  return (
    <div className="dashboard-page">

      <main className="dashboard-content">

        <h1>📚 Story Chapters</h1>

        <Link to={`/add-chapter/${storyId}`}>
          <button className="publish-btn">
            ➕ Add New Chapter
          </button>
        </Link>

        <br />
        <br />

        <div className="stories-grid">

          {chapters.length === 0 ? (
            <p>No chapters published yet.</p>
          ) : (
            chapters.map((chapter) => (
              <div className="stat-card" key={chapter.id}>

                <h2>
                  Chapter {chapter.chapterNumber}
                </h2>

                <h3>{chapter.chapterTitle}</h3>

                <Link
                  to={`/chapter/${chapter.id}`}
                >
                  <button className="read-chapter-btn">

  📖 Read Chapter

</button>
                </Link>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}

export default StoryChapters;