function Publish() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Publish Your Story
        </h1>

        <p>
          Share your Urdu writing with millions of readers.
        </p>


        <input
          type="text"
          placeholder="Story Title"
        />


        <input
          type="text"
          placeholder="Writer Name"
        />


        <input
          type="text"
          placeholder="Category"
        />


        <textarea
          placeholder="Story Description"
          rows="5"
        />


        <button>
          Publish Story
        </button>


      </div>

    </div>

  );

}


export default Publish;