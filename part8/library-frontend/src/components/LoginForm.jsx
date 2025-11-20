import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token.value;
      const favoriteGenre = result.data.login.user.favoriteGenre;
      props.setToken(token);
      props.setFavoriteGenre(favoriteGenre);
      localStorage.setItem("library-user-token", token);
      localStorage.setItem("library-user-favoriteGenre", favoriteGenre);
      props.setPage("authors");
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
