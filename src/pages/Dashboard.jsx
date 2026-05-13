import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { fetchEnrolledCourses } from "../api/mockApi";
import { Link } from "react-router-dom";


export default function Dashboard(){
    const {user} = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [section, setSection] = useState("courses");

    useEffect(()=>{
        if (!user) return;
        fetchEnrolledCourses(user.id).then(data=>{setCourses(data);
            setLoading(false);
        });
    },[user]);
    return(
        <div>
            <aside>
                <div>{user?. name[0]}</div>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <nav>
                    <button onClick={()=> setSection("courses")}>My Courses</button>
                    <button onClick={()=> setSection("profile")}>Profile</button>
                </nav>
            </aside>
            <main>
                {section === "courses" && (
                    <div>
                        <h1>My Dashboard</h1>
                        {loading && <p>Loading your courses..</p>}
                        {courses.map(course=>(
                            <div key={course.id}>
                                <img src={course.thumbnail} alt={course.title} />
                                <h3>{course.title}</h3>
                                <p>By {course.instructor}</p>
                                <Link to = {`/dashboard/lessons/${course.lessons[0].id}`}>Continue</Link>
                                 <Link to={`/dashboard/quiz/${course.quizId}`}> Quiz</Link>
                            </div>
                        ))}
                    </div>
                )}
                {section === "profile" && (
                    <div>
                        <h1>My Profile</h1>
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                )}
            </main>
        </div>
    )
}