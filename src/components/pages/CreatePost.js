import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

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

        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button onClick={createNewPost}>Create Post</button>
      </form>
    </>
  );
}
