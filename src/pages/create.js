import { useState } from "react";
import { useAppContext } from "../store/store";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [intro, setIntro] = useState("");
  const [completed, setCompleted] = useState(false);
  const [review, setReview] = useState("");

  const store = useAppContext();
  const navigate = useNavigate();

  function handleOnChangeFile(e) {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCover(reader.result.toString());
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newBook = {
      id: crypto.randomUUID(),
      title,
      author,
      cover,
      intro,
      completed,
      review,
    };

    store.createItem(newBook);
    navigate("/");
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "intro":
        setIntro(value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "review":
        setReview(value);
        break;

      default:
        break;
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Title</div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div>
          <div>Author</div>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>

        <div>
          <div>Cover</div>
          <input type="file" name="cover" onChange={handleOnChangeFile} />
          <div>
            {!!cover ? (
              <img src={cover} width="200" alt="Book Img" />
            ) : (
              <p>Error en el archivo</p>
            )}
          </div>
        </div>

        <div>
          <div>Introduction</div>
          <input
            type="text"
            name="intro"
            value={intro}
            onChange={handleChange}
          />
        </div>

        <div>
          <div>Completed</div>
          <input
            type="checkbox"
            name="completed"
            value={completed}
            onChange={handleChange}
          />
        </div>

        <div>
          <div>Review</div>
          <input
            type="text"
            name="review"
            value={review}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Register book" />
      </form>
    </Layout>
  );
}
