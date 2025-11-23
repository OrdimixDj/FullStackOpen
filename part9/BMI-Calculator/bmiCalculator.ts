interface BMIValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (size: number, weight: number) : string => {
  // BMI = weight (kg) divided by (size*size)
  const sizeInMeter = size/100
  const BMI = weight/(sizeInMeter*sizeInMeter)

  if (BMI < 18.5) {
    return "Underweight"
  }
  else if (BMI >= 25 && BMI <= 29.9){
    return "Overweight"
  }
  else if (BMI >= 30){
    return "Obesity"
  }
  else {
    return "Normal range"
  }
}

//console.log(calculateBmi(180, 74));

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
