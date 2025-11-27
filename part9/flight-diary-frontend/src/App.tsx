import { useState, useEffect } from "react";

import { Diary } from "./types";
import { getAllDiaries } from './diaryService';

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
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map(diary => <DiaryItem key={diary.id} diary={diary} />)}
    </div>
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
      <DiaryEntries diaries={diaries}/>
    </div>
  )
}

export default App