interface ExercisesValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));