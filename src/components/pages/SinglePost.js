import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function SinglePost() {
  const [postInfo, setPostInfo] = useState(null);
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams("slug");

  useEffect(() => {
    try {
      const getPost = async () => {
        const result = await fetch(`http://localhost:5000/post/${slug}`);
        const res = await result.json();
        const { author } = res;
        setPostInfo(res);
        setAuthor(author);
        setIsLoading(false);
      };
      getPost();
    } catch (error) {
      
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="post-page">
          <h1>{postInfo?.title}</h1>
          <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>
          <div className="author">by {author.fullName}</div>
          <div className="image">
            <img
              src={`http://localhost:5000/${postInfo?.cover}`}
              alt={postInfo?.title}
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postInfo?.content }}
          />
        </div>
      )}
    </>
  );
}
