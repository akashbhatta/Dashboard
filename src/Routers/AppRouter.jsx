import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CoursePage from '../pages/CoursePage'
import LoginPage from '../pages/LoginPage'
import QuizPage from '../pages/QuizPage'
import Dashboard from '../pages/Dashboard'
import LessonPage from '../pages/LessonPage'
import { useAuth } from '../components/context/AuthContext'

function ProtectedRoute({children}){
  const {user} = useAuth();
  return user ? children : <Navigate to = "/dashboard" replace/>;
}

function GuestRoute({children}){
const {user} = useAuth();
return user ? <Navigate to = "/dashboard" replace/> : children;
}
function AppRouter() {
  return (
    <Routes>
        <Route path ='/' element = {<HomePage/>}/>
        <Route path ='/courses/:id' element = {<CoursePage/>}/>

         <Route path ='/login' element = {
            <GuestRoute>
                <LoginPage />
            </GuestRoute>
           }/>
        <Route path ='/dashboard' element = {
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>
        }/>
        <Route path ='/lessons/:lessonId' element = {<LessonPage/>}/>
         <Route path ='/quiz/:quizId' element = {<QuizPage/>}/>
        <Route path ='*' element = {<Navigate to= '/'replace/>}/>
    </Routes>
  )
}

export default AppRouter