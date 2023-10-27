export default function Post({ title, summary, cover, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <img src="{{cover}}?" alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Ofem Eno</a>
          <time>{createdAt}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
