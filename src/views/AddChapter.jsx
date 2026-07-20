import "../styling/createStory.css";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styling/createStory.css";
import "../styling/chapterEditor.css";


function AddChapter() {

  const { storyId } = useParams();

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [content, setContent] = useState("");


  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;


  const characters = content.length;



  const publishChapter = async (e) => {

    e.preventDefault();


    if(!chapterTitle || !content){

      alert("Please write chapter title and content");

      return;

    }


    try {


      await addDoc(
        collection(db,"chapters"),
        {

          storyId,

          chapterTitle,

          chapterNumber:Number(chapterNumber),

          content,

          words,

          characters,

          createdAt:new Date()

        }
      );


      alert("🚀 Chapter Published");


      setChapterTitle("");
      setChapterNumber("");
      setContent("");


    }

    catch(error){

      console.log(error);

      alert(error.message);

    }

  };



return (

<div className="chapter-editor-page">


<div className="chapter-editor-card">


<h1>
✍ Write New Chapter
</h1>



<form onSubmit={publishChapter}>


<label>
Chapter Title
</label>


<input

type="text"

placeholder="Enter chapter title"

value={chapterTitle}

onChange={(e)=>setChapterTitle(e.target.value)}

/>



<label>
Chapter Number
</label>


<input

type="number"

placeholder="1"

value={chapterNumber}

onChange={(e)=>setChapterNumber(e.target.value)}

/>



<label>
Your Story
</label>


<textarea

className="chapter-writing-area"

placeholder="Start writing your chapter here..."

value={content}

onChange={(e)=>setContent(e.target.value)}

></textarea>



<div className="writing-stats">

<span>
Words: {words}
</span>


<span>
Characters: {characters}
</span>


</div>



<div className="story-actions">


<button

type="button"

className="draft-btn"

>

💾 Save Draft

</button>



<button

type="submit"

className="publish-btn"

>

🚀 Publish Chapter

</button>


</div>


</form>


</div>


</div>


);


}


export default AddChapter;