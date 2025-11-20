import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { ALL_BOOKS, ALL_AUTHORS, ALL_GENRES, CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      props.setError(error.message);
    },

    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],

    update: (cache, response) => {
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: "" } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(response.data.addBook),
          };
        }
      );

      // I noticed something during my tests: if I don't refresh ALL_BOOKS for all genres of the new book,
      // only the list without filter will be updated
      response.data.addBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: g } },
          // I replaced allBooks by data, because allBooks may not exist in case of
          // button genre for g was never clicked
          (data) => {
            // If one of the genres was never clicked before, it doesn't concat the book to the answer in cache
            // Because it simply have no allBooks answer cache for g
            if (!data) {
              return null;
            }

            return {
              allBooks: data.allBooks.concat(response.data.addBook),
            };
          }
        );
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
