function Categories() {

  const categories = [
    "Romance",
    "Mystery",
    "Horror",
    "Fantasy",
    "Poetry",
    "Fiction"
  ];


  return (

    <section className="categories">

      <h2>
        Explore Categories
      </h2>


      <div className="category-container">

        {
          categories.map((category, index) => (

            <div 
              className="category-card" 
              key={index}
            >

              {category}

            </div>

          ))
        }

      </div>


    </section>

  );

}


export default Categories;