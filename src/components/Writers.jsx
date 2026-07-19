function Writers() {

  const writers = [
    {
      name: "Za Muzaffar",
      stories: "5 Stories",
      bio: "Urdu fiction writer"
    },
    {
      name: "Ayesha Khan",
      stories: "12 Stories",
      bio: "Romance and poetry writer"
    },
    {
      name: "Ali Raza",
      stories: "8 Stories",
      bio: "Mystery story writer"
    }
  ];


  return (

    <section className="writers">

      <h2>
        Popular Writers
      </h2>


      <div className="writer-container">

        {
          writers.map((writer, index) => (

            <div 
              className="writer-card"
              key={index}
            >

              <div className="writer-avatar">
                ✍️
              </div>

              <h3>
                {writer.name}
              </h3>

              <p>
                {writer.bio}
              </p>

              <span>
                {writer.stories}
              </span>

              <button>
                View Profile
              </button>

            </div>

          ))
        }

      </div>


    </section>

  );

}


export default Writers;