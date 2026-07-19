import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import books from "../data/books";

function ReadBook() {
  const { id } = useParams();

  const book = books.find((item) => item.id === Number(id));

  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(26);
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!book) {
    return <h1>Story not found</h1>;
  }

  const chapter = book.chapters[currentChapter];

  return (
    <div className={darkMode ? "reading-page dark" : "reading-page"}>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="reading-layout">

        <aside className="chapter-sidebar">
          <h3>Chapters</h3>

          {book.chapters.map((item, index) => (
            <button
              key={item.id}
              className={currentChapter === index ? "active-chapter" : ""}
              onClick={() => setCurrentChapter(index)}
            >
              {item.title}
            </button>
          ))}
        </aside>

        <div className="reading-container">

          <div className="book-header">
            <h1>{book.title}</h1>
            <p className="writer-name">By {book.writer}</p>
          </div>

          <hr className="divider" />

          <div className="reader-toolbar">
            <button
              className="settings-btn"
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙ Reading Settings
            </button>
          </div>

          {showSettings && (
            <div className="settings-panel">

              <button onClick={() => setLiked(!liked)}>
                {liked ? "❤️ Liked" : "🤍 Like"}
              </button>

              <button onClick={() => setBookmarked(!bookmarked)}>
                {bookmarked ? "✅ Bookmarked" : "🔖 Bookmark"}
              </button>

              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>

              <button onClick={() => setFontSize(fontSize + 2)}>
                A+
              </button>

              <button
                onClick={() => {
                  if (fontSize > 18) {
                    setFontSize(fontSize - 2);
                  }
                }}
              >
                A-
              </button>

            </div>
          )}

          <div className="chapter-header">
            <h2>{chapter.title}</h2>

            <span>
              Chapter {currentChapter + 1} of {book.chapters.length}
            </span>
          </div>

          <div
            className="chapter-text"
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapter.content
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>

          <div className="chapter-ending">

  <div className="ending-line"></div>

  <h3>
    {currentChapter === book.chapters.length - 1
      ? "✔ You finished this story"
      : "✔ Chapter Completed"}
  </h3>

  <p>
    Continue your reading journey
  </p>


  <div className="chapter-buttons">

    <button
      disabled={currentChapter === 0}
      onClick={() => setCurrentChapter(currentChapter - 1)}
    >
      ← Previous Chapter
    </button>


    <button
      disabled={currentChapter === book.chapters.length - 1}
      onClick={() => setCurrentChapter(currentChapter + 1)}
    >
      Next Chapter →
    </button>

  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default ReadBook;