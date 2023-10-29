import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  title,
  summary,
  cover,
  createdAt,
  author,
  slug,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/post/id"}>
          <img src={"http://localhost:5000/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${slug}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.fullName}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
