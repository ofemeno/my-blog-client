import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../context/userContex";
import { Loading } from "../Loading";

export default function SinglePost() {
  const [postInfo, setPostInfo] = useState(null);
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(UserContext);
  const { slug } = useParams("slug");

  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await fetch(`https://my-blog-api-ehft.onrender.com/post/${slug}`);
        const res = await result.json();
        const { author } = res;
        setPostInfo(res);
        setAuthor(author);
        document.title = `MyBlog.com | ${res.title}`;
        setIsLoading(false);
      } catch (error) {}
    };
    getPost();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="post-page">
          <h1>{postInfo?.title}</h1>
          <time>{formatISO9075(new Date(postInfo?.createdAt))}</time>
          <div className="author">by {author.fullName}</div>
          {userInfo?.id === author._id && (
            <div className="edit-row">
              <Link to={`/edit/${slug}`} className="edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit This Post
              </Link>
            </div>
          )}
          <div className="image">
            <img
              src={`https://my-blog-api-ehft.onrender.com/${postInfo?.cover}`}
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
