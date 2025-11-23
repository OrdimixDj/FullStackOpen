interface ExercisesValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesInitialValues {
  values: number[];
  target: number;
}

const parseExercisesArguments = (args: string[]): ExercisesInitialValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hoursList = []

  // we start the loop at i=2 because the first 2 args are not interesting in that case
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      hoursList.push(Number(args[i]))
    } else {
        throw new Error('Provided values were not numbers!');
    }
  }

  return {
    values: hoursList,
    target: Number(args[2])
  }
}

const exerciseCalculator = (weekQuantities: number[], target: number): ExercisesValues => {
  const totalHours = weekQuantities.reduce((sum, val) => {
    return sum + val;
  }, 0);

  const averageHours = totalHours / weekQuantities.length

  let grade = 3;
  let gradeDesc = "Really good!";

  if(averageHours < target) {
    const gradeStep = target / 2;

    if(averageHours <= gradeStep) {
        grade = 1;
        gradeDesc = "Really bad! Try to do better next time"
    }
    else {
        grade = 2;
        gradeDesc = "not too bad but could be better"
    }
  }

  return {
    periodLength: weekQuantities.length,
    trainingDays: weekQuantities.filter(totH => totH > 0).length,
    success: averageHours >= target,
    rating: grade,
    ratingDescription: gradeDesc,
    target: target,
    average: averageHours
  }
}

// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const { values, target } = parseExercisesArguments(process.argv);
  console.log(exerciseCalculator(values, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
