import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Article } from "./Article";

export function Articles() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-zi98.onrender.com/api/articles")
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article.article_id} className="article-list-item">
          <Link to={`articles/${article.article_id}`}>
            <h2>{article.title}</h2>
            <div className="article-info-icons">
              <p>👩‍🦰 {article.author}</p>
              <p>💬 {article.comment_count}</p>
              <p>❤️{article.votes}</p>
              <img src={article.article_img_url} alt="" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
