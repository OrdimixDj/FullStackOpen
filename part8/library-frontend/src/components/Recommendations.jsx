import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS } from "../queries";

const Recommendations = (props) => {
  const booksQueryResult = useQuery(ALL_BOOKS);

  if (booksQueryResult.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  let books = booksQueryResult.data.allBooks;

  books = books.filter((book) => book.genres.includes(props.favoriteGenre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{props.favoriteGenre}</b>
      </p>
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
    </div>
  );
};

export default Recommendations;
