import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ChapterReader() {

  const { chapterId } = useParams();

  const [chapter, setChapter] = useState(null);

  useEffect(() => {

    const fetchChapter = async () => {

      try {

        const docRef = doc(db, "chapters", chapterId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          setChapter(docSnap.data());

        }

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchChapter();

  }, [chapterId]);


  if (!chapter) {

    return (

      <h2
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        Loading...
      </h2>

    );

  }


  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        background: "white",
        padding: "50px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.12)"
      }}
    >

      <h1
        style={{
          textAlign: "center"
        }}
      >
        {chapter.chapterTitle}
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#777",
          marginBottom: "40px"
        }}
      >
        Chapter {chapter.chapterNumber}
      </p>

      <hr />

      <div
        style={{
          marginTop: "40px",
          lineHeight: "2",
          fontSize: "20px",
          whiteSpace: "pre-wrap"
        }}
      >
        {chapter.content}
      </div>

      <hr
        style={{
          marginTop: "50px"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px"
        }}
      >

        <span>
          Words: {chapter.words}
        </span>

        <span>
          Characters: {chapter.characters}
        </span>

      </div>

    </div>

  );

}

export default ChapterReader;