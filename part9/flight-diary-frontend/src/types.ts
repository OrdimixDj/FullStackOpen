// First, I was using an interface, then I noticed for ex9.20
// I'll need an enum instead to get a "list" for radio buttons
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface Diary {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string,
}

export type NewDiary = Omit<Diary, 'id'>