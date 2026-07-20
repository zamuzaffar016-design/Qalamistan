import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Publish from "./views/Publish";
import ReadBook from "./views/ReadBook";
import Profile from "./views/Profile";
import Explore from "./views/Explore";
import StoryDetails from "./views/StoryDetails";
import WriterDashboard from "./views/WriterDashboard";
import CreateStory from "./views/CreateStory";
import MyStories from "./views/MyStories";
import EditStory from "./views/EditStory";
import AddChapter from "./views/AddChapter";
import ChapterReader from "./views/ChapterReader";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/publish"
          element={<Publish />}
        />

        <Route
          path="/read/:id"
          element={<ReadBook />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/story/:id"
          element={<StoryDetails />}
        />

        <Route
          path="/writer-dashboard"
          element={<WriterDashboard />}
        />

        <Route
          path="/create-story"
          element={<CreateStory />}
        />

        <Route
          path="/my-stories"
          element={<MyStories />}
        />

        <Route
          path="/edit-story/:id"
          element={<EditStory />}
        />
        <Route
  path="/add-chapter/:storyId"
  element={<AddChapter />}
/>

<Route
  path="/chapter/:storyId/:chapterId"
  element={<ChapterReader />}
/>

      </Routes>

      <Footer />

    </BrowserRouter>

  );

}

export default App;