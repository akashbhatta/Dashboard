import { useEffect, useMemo, useState } from "react";
import { fetchCourses } from "../api/mockApi";
import CourseCard from "../components/CourseCard"

export default function HomePage(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        fetchCourses().then(data => {setCourses(data); setLoading(false);});
    },[])
    const filtered = useMemo(()=>{
        if(!search.trim()) return courses;
        return courses.filter(c=>
            c.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
            c.instructor.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
    },[courses, search]);
    return(
        <main>
            <section>
                <h1>Learn Without Limits!!!</h1>
                <p>Level up your skills</p>
                <input type="search" value={search}
                onChange={e=> setSearch(e.target.value)}
                placeholder="Search courses or instructors." />
            </section>
            <section>
                <h2>{search?  `Results for "${search}"`: "All Courses"}
                    ({filtered.length})
                </h2>
                {loading && <p>Loading courses...</p>}
                {!loading && filtered.length === 0 && <p>No courses found.</p>}
                <div>
                    {filtered.map(course=> <CourseCard key = {course.id} course = {course}/>)}
                </div>
            </section>
        </main>
    )
}