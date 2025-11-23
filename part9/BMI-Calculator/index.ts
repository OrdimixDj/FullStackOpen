import {calculateBmi} from './bmiCalculator'

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack !');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (isNaN(Number(height)) || isNaN(Number(weight)) || height === "" || weight === "") {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  } else {
    const heightValue = Number(height)
    const weightValue = Number(weight)
    const bmi = calculateBmi(heightValue, weightValue);

    return res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});