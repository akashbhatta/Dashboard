import { useState,useParams, useRef, useEffect } from "react";
import { fetchLessonById } from "../api/mockApi";
import {Link, Links} from "react-router-dom"
import LessonList from "../components/LessonList"

export default function LessonPage(){
    const {lessonId} = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(()=>{
        setLoading(true); setPlaying(false);
        fetchLessonById(lessonId).then(data=> {setLesson(data); setLoading(false);})
    },[lessonId]);

    function handlePlay(){
        videoRef.current?.play();
        setPlaying(true);
    }
    function handlePause(){
        videoRef.current?.pause();
        setPlaying(false);
    }
    function handleRestart(){
        if (videoRef.current){
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setPlaying(true);
        }
    }
    if (loading) return <p>Loading Lesson</p>;
    if (!lesson) return <p>Lesson not found.</p>;

    return(
        <main>
            <nav>
                <Link to = "/dashboard">Dashboard</Link>
                <Link to = "{`/courses/${lesson.courseId}`}">{lesson.courseTitle}</Link>
                <span>{lesson.title}</span>
            </nav>
            <h1>{lesson.title}</h1>
            <p>🕒 {lesson.duration}</p>
            <video ref={videoRef} src={lesson.videoUrl}
            onEnded={()=>setPlaying(false)} controls/>

            <div>
                <button onClick={handlePlay} disabled={playing}>Play</button>
                <button onClick={handlePause} disabled={!playing}>Pause</button>
                <button onClick={handleRestart}>Restart</button>
            </div>
            <Link to = {`/dashboard/quiz/${lesson.quizId}`}> Take Quiz</Link>
            <LessonList lessons = {lesson.allLessons} activeLessonId = {lessonId}/>
        </main>
    )


   
}