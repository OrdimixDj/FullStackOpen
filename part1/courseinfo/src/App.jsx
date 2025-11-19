import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return <div>{result.data.allAuthors.map((a) => a.name).join(", ")}</div>;

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <h1>{course.name}</h1>
      <p>
        {course.parts[0].name} {course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].name} {course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].name} {course.parts[2].exercises}
      </p>
      <p>
        Number of exercises{" "}
        {course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises}
      </p>
    </div>
  );
};

export default App;
