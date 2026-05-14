import { Link } from 'react-router-dom'

export default function CourseCard({course}) {
  const image = course.thumbnail || course.image;

  return (
    <div>
        <img src={image} alt={course.title} />
        <div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.instructor}</p>
            <div>
                <span>⭐ {course.rating}</span>
                <span>{course.students.toLocaleString()} students</span>
            </div>
            <strong>${course.price}</strong>
        </div>
        <Link to = {`/courses/${course.id}`}>View Course</Link>
    </div>
  )
}
