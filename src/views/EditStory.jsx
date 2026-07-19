import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styling/createStory.css";

function EditStory() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mystery");
  const [language, setLanguage] = useState("Urdu");
  const [description, setDescription] = useState("");

  useEffect(() => {

    const loadStory = async () => {

      try {

        const docRef = doc(db, "stories", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          const story = docSnap.data();

          setTitle(story.title);
          setCategory(story.category);
          setLanguage(story.language);
          setDescription(story.description);

        }

      } catch (error) {

        console.log(error);

      }

    };

    loadStory();

  }, [id]);



  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await updateDoc(doc(db, "stories", id), {

        title,
        category,
        language,
        description

      });

      alert("✅ Story updated successfully!");

      navigate("/my-stories");

    } catch (error) {

      alert(error.message);

    }

  };



  return (

    <div className="create-story-page">

      <div className="create-story-card">

        <h1>Edit Story</h1>

        <form onSubmit={handleUpdate}>

          <label>Story Title</label>

          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />



          <label>Category</label>

          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >

            <option>Mystery</option>
            <option>Romance</option>
            <option>Fantasy</option>
            <option>Thriller</option>
            <option>Horror</option>
            <option>Action</option>

          </select>



          <label>Language</label>

          <select
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >

            <option>Urdu</option>
            <option>English</option>

          </select>



          <label>Description</label>

          <textarea
            rows="6"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />



          <button
            type="submit"
            className="publish-btn"
          >

            Save Changes

          </button>

        </form>

      </div>

    </div>

  );

}

export default EditStory;