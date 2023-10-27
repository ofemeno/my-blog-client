import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <>
      <form action="">
        <input type="text" placeholder={"title"} />
        <input type="text" placeholder={"summary"} />
        <input type="file" />
        <ReactQuill />
      </form>
    </>
  );
}
