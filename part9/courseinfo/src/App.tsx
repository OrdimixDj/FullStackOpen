interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial

interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br/>
          <em>{props.part.description}</em>
        </p>
      )
    case "group":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br/>
          project exercises {props.part.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br/>
          <em>{props.part.description}</em>
          <br/>
          submit to {props.part.backgroundMaterial}
        </p>
      )
    case "special":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br/>
          <em>{props.part.description}</em>
          <br/>
          required skills: {props.part.requirements.join(', ')}
        </p>
      )
    default:
      return assertNever(props.part);
  }
};

interface TotalProps {
  totalExercises: number;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} /> 
      ))}
    </>
  );
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];


  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
};


export default App;