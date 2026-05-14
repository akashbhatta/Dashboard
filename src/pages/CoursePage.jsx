import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {useAuth} from "../components/context/AuthContext.jsx";
import {fetchCourseById} from "../api/mockApi.js";
import LessonList from "../components/LessonList";

export default function CoursePage(){
    const {id} = useParams();
    const {user} = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetchCourseById(id).then (data => {
            setCourse(data); setLoading(false);
        });
    },[id]);
    if(loading) return <p>Loading Course..</p>
    if (!course) return <p>Course not found.</p>

    return(
        <main>
            <nav>
            <Link to = "/">Courses</Link>
            <span>{course.title}</span>
            </nav>
            <img src={course.image || course.thumbnail} alt={course.title} />
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p>By {course.instructor}</p>
            <p>⭐ {course.rating} · {course.students.toLocaleString()}</p>
            <strong>${course.price}</strong>
            {user ? 
            <Link to = "/dashboard">Go to dashboard </Link>
            : <Link to= "/login">Login to enroll</Link>
            }
            <LessonList lessons = {course.lessons}/>
            {user ? 
                <Link to ={`/quiz/${course.quizId}`}>Give Quiz</Link>
            : <Link to = "/login">Login to give quiz</Link>
            }
        </main>
    )
}
