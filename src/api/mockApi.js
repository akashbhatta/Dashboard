const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
export const COURSES = [
  { id:"1", title:"React for Beginners", instructor:"Sarah Lee",
    description:"Learn React from scratch with hands-on projects.",
    thumbnail:"https://picsum.photos/seed/react/400/225",
    price:49, rating:4.8, students:1240, quizId:"q1",
    lessons:[
      {id:"l1",title:"Introduction to React",duration:"12 min",videoUrl:""},
      {id:"l2",title:"JSX & Components",duration:"18 min",videoUrl:""},
      {id:"l3",title:"State & Props",duration:"22 min",videoUrl:""},
      {id:"l4",title:"Hooks Deep Dive",duration:"30 min",videoUrl:""},
    ]},
  { id:"2", title:"Node.js & Express API", instructor:"Mark Chen",
    description:"Build REST APIs with Node.js, Express, and MongoDB.",
    thumbnail:"https://picsum.photos/seed/node/400/225",
    price:59, rating:4.6, students:980, quizId:"q2",
    lessons:[
      {id:"l5",title:"Intro to Node.js",duration:"15 min",videoUrl:""},
      {id:"l6",title:"Express Routing",duration:"20 min",videoUrl:""},
      {id:"l7",title:"MongoDB & Mongoose",duration:"25 min",videoUrl:""},
    ]},
  { id:"3", title:"Python Data Science", instructor:"Priya Sharma",
    description:"Master pandas, numpy, matplotlib, and scikit-learn.",
    thumbnail:"https://picsum.photos/seed/python/400/225",
    price:69, rating:4.9, students:2100, quizId:"q3",
    lessons:[
      {id:"l8",title:"Python Basics",duration:"14 min",videoUrl:""},
      {id:"l9",title:"Pandas & DataFrames",duration:"28 min",videoUrl:""},
      {id:"l10",title:"Data Visualization",duration:"20 min",videoUrl:""},
    ]},
];
export const QUIZZES = {
  q1:{ id:"q1", title:"React Basics Quiz", questions:[
    {id:"qu1",text:"What hook manages state?",options:["useEffect","useState","useRef","useMemo"],answer:"useState"},
    {id:"qu2",text:"What does JSX stand for?",options:["Java Syntax Extension","JavaScript XML","JSON Extension","None"],answer:"JavaScript XML"},
    {id:"qu3",text:"Which hook runs after render?",options:["useState","useRef","useEffect","useContext"],answer:"useEffect"},
  ]},
  q2:{ id:"q2", title:"Node.js Quiz", questions:[
    {id:"qu4",text:"What does npm stand for?",options:["Node Package Manager","New Project Module","Node Program Manager","None"],answer:"Node Package Manager"},
    {id:"qu5",text:"Which handles GET in Express?",options:["app.post()","app.get()","app.use()","app.listen()"],answer:"app.get()"},
  ]},
  q3:{ id:"q3", title:"Python Data Science Quiz", questions:[
    {id:"qu6",text:"Which library is for data manipulation?",options:["numpy","matplotlib","pandas","seaborn"],answer:"pandas"},
    {id:"qu7",text:"How do you read a CSV in pandas?",options:["pd.read_excel()","pd.read_csv()","pd.load()","pd.open()"],answer:"pd.read_csv()"},
  ]},
};
export async function fetchCourses() { await delay(); return COURSES; }
export async function fetchCourseById(id) { await delay(); return COURSES.find(c=>c.id===id)||null; }
export async function fetchLessonById(lessonId) {
  await delay();
  for (const course of COURSES) {
    const lesson = course.lessons.find(l=>l.id===lessonId);
    if (lesson) return {...lesson,courseId:course.id,courseTitle:course.title,quizId:course.quizId,allLessons:course.lessons};
  }
  return null;
}
export async function fetchQuizById(quizId) { await delay(); return QUIZZES[quizId]||null; }
export async function fetchEnrolledCourses(userId) { await delay(); return [COURSES[0],COURSES[2]]; }