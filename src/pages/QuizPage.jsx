import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCourseById } from "../api/mockApi";
import Quiz from "../components/Quiz";

export default function QuizPage(){
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetchCourseById(quizId).then(data =>{setQuiz(data); setLoading(false);});
    },[quizId]);
    return(
        <main>
            <nav><Link to = "/dashboard">Dashboard</Link> <span>Quiz</span></nav>
{!loading && !quiz && <p>Quiz not found.</p>}
{quiz && <Quiz quiz={quiz} />}
        </main>
    )
}