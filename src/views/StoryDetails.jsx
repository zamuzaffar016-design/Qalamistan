import { useParams } from "react-router-dom";
import books from "../data/books";
import { Link } from "react-router-dom";


function StoryDetails() {

  const { id } = useParams();


  const book = books.find(
    (item) => item.id === Number(id)
  );


  if (!book) {

    return <h1>Story not found</h1>;

  }


  return (

    <div className="story-page">


      <div className="story-card">


        <img
          src={book.cover}
          alt={book.title}
        />


        <div className="story-info">


          <h1>
            {book.title}
          </h1>


          <h3>
            By {book.writer}
          </h3>


          <p>
            Category: {book.category}
          </p>


          <p>
            {book.description}
          </p>


          <Link to={`/read/${book.id}`}>

  <button>
    Start Reading
  </button>

</Link>


        </div>


      </div>


    </div>

  );

}


export default StoryDetails;