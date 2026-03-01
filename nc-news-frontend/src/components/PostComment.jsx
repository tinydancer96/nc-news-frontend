import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export function PostComment({ articleId, setDisplayCommentList, children }) {
  const [err, setErr] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `https://nc-news-zi98.onrender.com/api/articles/${articleId}/comments`,
        { author: user.username, body: userInput },
      )
      .then((response) => {
        const newComment = response.data.comment;
        setDisplayCommentList((currentList) => ({
          comments: [newComment, ...currentList.comments],
        }));
        setUserInput("");
      })
      .catch(() => {
        setErr(true);
      });
  }

  return (
    <div>
      {err && <p>Error posting comment, please try again.</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={userInput}
          placeholder="Comment"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
