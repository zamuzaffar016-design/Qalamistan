import "../styling/dashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";


function WriterDashboard() {

  const [totalStories, setTotalStories] = useState(0);


  useEffect(() => {

    const getStories = async () => {

      try {

        const querySnapshot = await getDocs(
          collection(db, "stories")
        );

        setTotalStories(querySnapshot.size);

      } catch (error) {

        console.log(error);

      }

    };


    getStories();

  }, []);



  return (

    <div className="dashboard-page">


      <aside className="dashboard-sidebar">


        <h2>Qalamistan</h2>


        <button>🏠 Dashboard</button>

        <Link to="/my-stories">
  <button>
    📚 My Stories
  </button>
</Link>


        <Link to="/create-story">

          <button>
            ✍ Create Story
          </button>

        </Link>


        <button>📝 Drafts</button>

        <button>🚀 Published</button>

        <button>📊 Analytics</button>

        <button>👤 Profile</button>

        <button>⚙ Settings</button>


      </aside>




      <main className="dashboard-content">


        <h1>
          Welcome Back, Writer 👋
        </h1>


        <p>
          Manage your stories, drafts and published novels from one place.
        </p>




        <div className="stats-grid">


          <div className="stat-card">

            <h2>
              {totalStories}
            </h2>

            <span>
              📚 Total Stories
            </span>

          </div>




          <div className="stat-card">

            <h2>
              0
            </h2>

            <span>
              👁 Total Reads
            </span>

          </div>




          <div className="stat-card">

            <h2>
              0
            </h2>

            <span>
              ❤️ Likes
            </span>

          </div>




          <div className="stat-card">

            <h2>
              0
            </h2>

            <span>
              📝 Drafts
            </span>

          </div>



        </div>



      </main>



    </div>

  );

}


export default WriterDashboard;