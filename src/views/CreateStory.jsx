import "../styling/createStory.css";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

function CreateStory() {

  const [cover, setCover] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mystery");
  const [language, setLanguage] = useState("Urdu");
  const [description, setDescription] = useState("");


  const handlePublish = async (e) => {

    console.log("Publish button clicked");

    e.preventDefault();


    if (!title || !description) {

      alert("Please fill all required fields.");
      return;

    }


    try {

      await addDoc(collection(db, "stories"), {

  title,
  category,
  language,
  description,

  writerId: auth.currentUser.uid,

  createdAt: new Date(),

});


      alert("🎉 Story published successfully!");


      setTitle("");
      setCategory("Mystery");
      setLanguage("Urdu");
      setDescription("");
      setCover(null);


    } 
    catch (error) {

  console.log("Firebase Error:", error);

  alert("Error: " + error.message);

}

  };


  return (

    <div className="create-story-page">

      <div className="create-story-card">


        <h1>Create New Story</h1>


        <form onSubmit={handlePublish}>


          <label>Story Title</label>

          <input

            type="text"

            placeholder="Enter story title"

            value={title}

            onChange={(e) => setTitle(e.target.value)}

          />



          <label>Category</label>

          <select

            value={category}

            onChange={(e) => setCategory(e.target.value)}

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

            onChange={(e) => setLanguage(e.target.value)}

          >

            <option>Urdu</option>
            <option>English</option>

          </select>





          <label>Description</label>

          <textarea

            rows="6"

            placeholder="Write your story description..."

            value={description}

            onChange={(e) => setDescription(e.target.value)}

          ></textarea>





          <label>Cover Image</label>


          <input

            type="file"

            accept="image/*"

            onChange={(e) => {

              const file = e.target.files[0];

              if (file) {

                setCover(URL.createObjectURL(file));

              }

            }}

          />




          {cover && (

            <div className="cover-preview">

              <h3>Cover Preview</h3>

              <img

                src={cover}

                alt="Preview"

              />

            </div>

          )}




          <div className="story-actions">


            <button

              type="button"

              className="draft-btn"

            >

              Save Draft

            </button>




            <button

              type="submit"

              className="publish-btn"

            >

              Publish Story

            </button>



          </div>


        </form>


      </div>


    </div>

  );

}


export default CreateStory;