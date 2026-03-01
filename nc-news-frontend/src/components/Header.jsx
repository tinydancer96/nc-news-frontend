import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export function Header() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [err, setErr] = useState(false);
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   axios
  //     .get(`https://nc-news-zi98.onrender.com/api/users/${user.username}`)
  //     .then((response) => {
  //       // setUser(response.data.user[0]);
  //     })
  //     .catch((error) => {
  //       setErr(true);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <div>
      {/* {isLoading && "...Loading..."}
      {err && "...Error has Occured..."} */}
      {/* {!isLoading && !err && ( */}
      <div className="userHeader">
        <img src={user.avatar_url} />
        <p>Welcome {user.name}!</p>
      </div>
      {/* )} */}
    </div>
  );
}
