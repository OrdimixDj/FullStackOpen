import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const localToken = localStorage.getItem("library-user-token");
    const localFavoriteGenre = localStorage.getItem(
      "library-user-favoriteGenre"
    );

    if (localToken) {
      setToken(localToken);
    }

    if (localFavoriteGenre) {
      setFavoriteGenre(localFavoriteGenre);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  // I transformed the normal function to an async one: without awaiting for client.clearStore(),
  // I was getting an error "Uncaught (in promise) AbortError: The operation was aborted."
  const logout = async () => {
    setErrorMessage(null);
    setToken(null);
    setFavoriteGenre(null);
    localStorage.clear();
    try {
      await client.clearStore();
    } catch (e) {
      console.error(e);
    }
  };

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />
        <Authors show={page === "authors"} />
        <Books show={page === "books"} />
        <LoginForm
          setToken={setToken}
          setFavoriteGenre={setFavoriteGenre}
          setError={notify}
          setPage={setPage}
          show={page === "login"}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook setError={notify} show={page === "add"} />
      <Recommendations
        favoriteGenre={favoriteGenre}
        show={page === "recommend"}
      />
    </div>
  );
};

export default App;
