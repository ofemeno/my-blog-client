import { Loading } from "../Loading";
import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch("https://my-blog-api-ehft.onrender.com/post")
      .then((response) => {
        response.json().then((posts) => {
          console.log(posts);
          setPosts(posts);
          setIsLoading(false)
        });
      })
      .catch((error) => {});
  }, []);
  return <>{isLoading ? (<Loading />) : <>
  {posts.length > 0 && posts.map((post) => <Post {...post} />)}
  </> }</>;
}
