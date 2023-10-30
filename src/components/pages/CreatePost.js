import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContex";
import { Editor } from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {userInfo} = useContext(UserContext)
  const username = userInfo?.username

  // create new post
  async function createNewPost(e) {
    e.preventDefault();

    // create new form data
    const data = new FormData();

    data.set("title", title);

    data.set("summary", summary);

    data.set("content", content);

    data.set("file", files[0]);

    // console.log(files);

    try {
      // submit form using fetch
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {}
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
  <>
   {username && (
    <form action="" className="create">
    <input
      type="text"
      placeholder={"title"}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="text"
      placeholder={"summary"}
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
    />

    <input type="file" onChange={(e) => setFiles(e.target.files)} />

    <Editor value={content} onChange={setContent} />
    
    <button onClick={createNewPost}>Create Post</button>
  </form>
   )}
  </>
  );
}
