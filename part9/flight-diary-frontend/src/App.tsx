import { useState, useEffect } from "react";

import { Diary, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from './diaryService';


interface DiaryFormProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary = {
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment,
    }

    createDiary(newDiary).then(data => {
      props.setDiaries(props.diaries.concat(data))
    })

    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('');
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        date<input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)} 
        />
        <br/>
        visibility<input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)} 
        />
        <br/>
        weather<input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)} 
        />
        <br/>
        comment<input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)} 
        />
        <br/>
        <button type='submit'>add</button>
      </form>
    </>
  )
}

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = (props: DiaryItemProps) => {
  return (
    <>
      <p>
        <b>{props.diary.date}</b>
        <br/><br/>
        visibility: {props.diary.visibility}
        <br/>
        weather: {props.diary.weather}
      </p>
    </>
  )
}

interface DiaryEntriesProps {
  diaries: Diary[]; 
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <>
      <h2>Diary entries</h2>
      {props.diaries.map(diary => <DiaryItem key={diary.id} diary={diary} />)}
    </>
  )
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries}/>
      <DiaryEntries diaries={diaries}/>
    </div>
  )
}

export default App