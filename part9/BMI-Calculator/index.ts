import {calculateBmi} from './bmiCalculator';
import {exerciseCalculator} from './exerciseCalculator';

import express from 'express';
const app = express();

app.use(express.json());

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
    const heightValue = Number(height);
    const weightValue = Number(weight);
    const bmi = calculateBmi(heightValue, weightValue);

    return res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target } = req.body;

  if ( !daily_exercises || !target ) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if ( !Array.isArray(daily_exercises) || daily_exercises.length < 1 || isNaN(Number(target)) ) {
    return res.status(400).send({ error: "malformatted parameters"});
  }

  const hoursList = [];

  for (const hourQty of daily_exercises) {
    if (isNaN(Number(hourQty))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
    hoursList.push(Number(hourQty));
  }

  const result = exerciseCalculator(hoursList, Number(target));

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});