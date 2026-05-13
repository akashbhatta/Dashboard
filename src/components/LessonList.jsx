import React from 'react'
import { Link } from 'react-router-dom';

export default  function LessonList({lessons, activeLessonId}) {
  return (
  <ul>
    {lessons.map ((lesson, index)=>{
        const isActive = lesson.id === activeLessonId;
        return(
        <li key = {lesson.id}>
            <span>{index + 1}</span>
            <span>{lesson.title}</span>
            <small>{lesson.duration}</small>
            <Link to={`/dashboard/lessons/${lesson.id}`}>
            {isActive ? "Current":"Start"}
            </Link>
        </li>
        );
    })}
  </ul>
  );
}

