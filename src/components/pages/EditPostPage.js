import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../Editor";
import { UserContext } from "../../context/userContex";
import { Loading } from "../Loading";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [postInfo, setPostInfo] = useState("");
  const [files, setFiles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { slug } = useParams("slug");
  const username = userInfo?.username;
  // create new post
  async function updatePost(e) {
    e.preventDefault();

    // create new form data
    const data = new FormData();

    data.set("title", title);

    data.set("summary", summary);

    data.set("content", content);

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    async function postUpdate() {
      try {
        // submit form using fetch
        const response = await fetch(`http://localhost:5000/post/${slug}`, {
          method: "PUT",
          body: data,
          credentials: "include",
        });
        const info = await response.json();
        console.log(info);
        if (response.ok) {
          setPostInfo(info);
          setRedirect(true);
        }
      } catch (error) {}
    }
    postUpdate();
  }

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(`http://localhost:5000/post/${slug}`);
        const info = await response.json();
        setContent(info.content);
        setSummary(info.summary);
        setTitle(info.title);
      } catch (error) {}
    }
    getPost();
    setIsLoading(false);
  }, []);

  if (redirect) {
    return <Navigate to={`/post/${postInfo.slug}`} />;
  }

  if (!username) {
    return <Navigate to={`/login`} />;
  }

  return (
    <>
      {username && (
        <>
          {isLoading ? (
            <Loading />
          ) : (
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

              <button onClick={updatePost}>Edit Post</button>
            </form>
          )}
        </>
      )}
    </>
  );
}
