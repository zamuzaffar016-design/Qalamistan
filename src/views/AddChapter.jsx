import "../styling/createStory.css";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddChapter() {
  const { storyId } = useParams();

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!chapterTitle || !chapterNumber || !content) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "chapters"), {
        storyId: storyId,
        chapterTitle: chapterTitle,
        chapterNumber: Number(chapterNumber),
        content: content,
        createdAt: new Date(),
      });

      alert("🎉 Chapter published successfully!");

      setChapterTitle("");
      setChapterNumber("");
      setContent("");
    } catch (error) {
      console.log("Firebase Error:", error);
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);

      alert(error.message);
    }
  };

  return (
    <div className="create-story-page">
      <div className="create-story-card">

        <h1>Add New Chapter</h1>

        <form onSubmit={handlePublish}>

          <label>Chapter Title</label>

          <input
            type="text"
            placeholder="Enter Chapter Title"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />

          <label>Chapter Number</label>

          <input
            type="number"
            placeholder="1"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
          />

          <label>Chapter Content</label>

          <textarea
            rows="18"
            placeholder="Write your chapter here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="story-actions">

            <button
              type="submit"
              className="publish-btn"
            >
              Publish Chapter
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddChapter;