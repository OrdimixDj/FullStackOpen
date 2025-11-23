type Operation = 'multiply' | 'add' | 'divide';


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

console.log(calculateBmi(180, 74));
