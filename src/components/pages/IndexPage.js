import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then((response) => {
        response.json().then((posts) => {
          console.log(posts);
          setPosts(posts);
        });
      })
      .catch((error) => {});
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
