import { useState } from "react";
import { Link } from "react-router-dom";
import books from "../data/books";

function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.writer.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="books">
      <h2>Explore Stories</h2>

      <div className="category-buttons">
        {["All", "Mystery", "Romance", "Fantasy", "Poetry", "Horror"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search books, writers, categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="book-container">
        {filteredBooks.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>

            <h3>{book.title}</h3>

            <p>By {book.writer}</p>

            <p>{book.category}</p>

            <Link to={`/story/${book.id}`}>
              <button>Read Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Books;