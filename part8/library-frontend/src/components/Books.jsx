import { useState } from "react";
import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const booksQueryResult = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const genresQueryResult = useQuery(ALL_GENRES);

  if (booksQueryResult.loading || genresQueryResult.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  let books = booksQueryResult.data.allBooks;
  const genres = genresQueryResult.data.allGenres;

  return (
    <div>
      <h2>books</h2>

      {genre !== "" ? (
        <div>
          {"in genre "}
          <b>{genre}</b>
        </div>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => setGenre(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
