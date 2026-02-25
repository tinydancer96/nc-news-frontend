import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { use } from "react";
export function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [displayCommentList, setDisplayCommentList] = useState({});
  const [voteArticle, setVoteArticle] = useState(0);

  // fetching data for article
  useEffect(() => {
    axios
      .get(`https://nc-news-zi98.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // fetch comments
  useEffect(() => {
    axios
      .get(
        `https://nc-news-zi98.onrender.com/api/articles/${article_id}/comments`,
      )
      .then((response) => {
        setDisplayCommentList(response.data);
      })
      .catch(() => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (voteArticle === 0) return;
    axios
      .patch(`https://nc-news-zi98.onrender.com/api/articles/${article_id}`, {
        inc_votes: voteArticle,
      })
      .then(() => {
        setArticle((currentArticle) => ({
          article: [
            {
              ...currentArticle.article[0],
              votes: currentArticle.article[0].votes + voteArticle,
            },
          ],
        }));
        setVoteArticle(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [voteArticle]);

  if (isLoading) {
    return "Loading...";
  }

  function commentButton() {
    setShowComments(!showComments);
  }

  // declaring article's data variables
  const img = article.article[0].article_img_url;
  const author = article.article[0].author;
  const body = article.article[0].body;
  const commentCount = article.article[0].comment_count;
  const title = article.article[0].title;
  const votes = article.article[0].votes;
  const created = article.article[0].created_at;

  // load comments function
  return (
    <div>
      {!isLoading && (
        <div>
          <div>
            <div className="article-info-icons">
              <p>👩‍🦰{author}</p>
              <p>🕰️{created}</p>
            </div>
            <h2>{title}</h2>
            <p>{body}</p>
            <img src={img} alt="" />
            <div className="article-info-icons">
              <p>💬{commentCount}</p>
              <p>❤️{votes}</p>
            </div>
          </div>
          <div>
            <button onClick={commentButton}>Comments</button>
            <button
              onClick={() => {
                setVoteArticle(1);
              }}
            >
              👍
            </button>
            <button
              onClick={() => {
                setVoteArticle(-1);
              }}
            >
              👎
            </button>
          </div>

          <div>
            {showComments &&
              displayCommentList.comments &&
              displayCommentList.comments.map((comment) => (
                <div key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <div className="comment-info-icons">
                    <p>👩‍🦰{comment.author}</p>
                    <p>❤️{comment.votes}</p>
                    <p>🕰️{comment.created_at}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
