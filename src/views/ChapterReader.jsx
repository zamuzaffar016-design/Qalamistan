import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import "../styling/reading.css";


function ChapterReader() {

  const { chapterId } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  const [fontSize, setFontSize] = useState(20);


  useEffect(() => {

  const fetchChapter = async () => {

    try {

      const chapterRef = doc(db, "chapters", chapterId);

      const chapterSnap = await getDoc(chapterRef);


      if (chapterSnap.exists()) {

        const currentChapter = chapterSnap.data();

        setChapter(currentChapter);


        const q = query(
          collection(db, "chapters"),
          where(
            "storyId",
            "==",
            currentChapter.storyId
          )
        );


        const snapshot = await getDocs(q);


        const chapterList = snapshot.docs.map((doc)=>({

          id:doc.id,

          ...doc.data()

        }));


        chapterList.sort(
          (a,b)=>a.chapterNumber-b.chapterNumber
        );


        setChapters(chapterList);

      }


    }

    catch(error){

      console.log(error);

    }

  };


  fetchChapter();


}, [chapterId]);



  if(!chapter){

    return (

      <h2 className="loading">

        Loading...

      </h2>

    );

  }



  return (

    <div className={darkMode ? "reader dark" : "reader"}>


      <div className="reader-container">


        <div className="reader-tools">


          <button onClick={()=>setFontSize(fontSize + 2)}>

            A+

          </button>


          <button onClick={()=>setFontSize(fontSize - 2)}>

            A-

          </button>


          <button onClick={()=>setDarkMode(!darkMode)}>

            🌙

          </button>


        </div>



        <h1>

          {chapter.chapterTitle}

        </h1>



        <p className="chapter-number">

          Chapter {chapter.chapterNumber}

        </p>



        <hr />



        <div

        className="chapter-content"

        style={{

          fontSize:`${fontSize}px`

        }}

        >

          {chapter.content}

        </div>



        <hr />


<div className="chapter-navigation">


{

chapters.findIndex(
(chapterItem)=>
chapterItem.id === chapterId
) > 0 && (

<button

onClick={()=>{

const index =
chapters.findIndex(
(chapterItem)=>
chapterItem.id === chapterId
);


window.location.href =
`/chapter/${chapters[index-1].id}`;

}}

>

⬅ Previous Chapter

</button>

)

}



{

chapters.findIndex(
(chapterItem)=>
chapterItem.id === chapterId
) < chapters.length-1 && (

<button

onClick={()=>{

const index =
chapters.findIndex(
(chapterItem)=>
chapterItem.id === chapterId
);


window.location.href =
`/chapter/${chapters[index+1].id}`;

}}

>

Next Chapter ➡

</button>

)

}


</div>
        <div className="reading-info">


          <span>

            Words: {chapter.words}

          </span>


          <span>

            Characters: {chapter.characters}

          </span>


        </div>


      </div>


    </div>

  );


}


export default ChapterReader;