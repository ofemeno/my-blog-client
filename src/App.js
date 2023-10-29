import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./components/pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/IndexPage";
import RegisterPage from "./components/pages/RegisterPage";
import { UserContextProvider } from "./context/userContex";
import CreatePost from "./components/pages/CreatePost";
import SinglePost from "./components/pages/SinglePost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route pat="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:slug" element={<SinglePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
