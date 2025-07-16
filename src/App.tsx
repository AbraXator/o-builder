import { useState, useEffect } from 'react';
import MapPage from './pages/MapPage';
import ItemsPage from './pages/ItemsPage'
import MainMenuPage from './pages/MainMenuPage';
import CreateCoursePage from './pages/CreateCoursePage';
import RecentCoursesPage from './pages/RecentCoursesPage';
import ControlsPage from './pages/ControlsPage';

function App() {
  const [page, setPage] = useState('main') //main, createCourse, recent, map, items
  const [currentCourseState, setCurrentCourseState] = useState<CourseState>({
    selectedControlType: "control",
    selectedControl: null,
    mode: null,
    currentRoute: null
  })
  const [currentCourse, setCurrentCourse] = useState<Course>({
    id: null,
    name: "",
    scale: null,
    map: "",
    routes: [],
    createdAt: ""
  })
  const [lastAction, setLastAction] = useState([null]); // 'addControl', 'removeControl'

  return (
    <>
      {page === "main" && <MainMenuPage setPage={setPage} setCurrentCourse={setCurrentCourse} /> }
      {page === "createCourse" && <CreateCoursePage setPage={setPage} setCurrentCourse={setCurrentCourse} />}
      {page === "recent" && <RecentCoursesPage setPage={setPage} setCurrentCourse={setCurrentCourse} />}
      {page === "map" && <MapPage setPage={setPage} currentCourseState={currentCourseState} setCurrentCourseState={setCurrentCourseState} currentCourse={currentCourse} setCurrentCourse={setCurrentCourse} />}
      {page === "items" && <ItemsPage setPage={setPage} currentCourseState={currentCourseState} setCurrentCourseState={setCurrentCourseState} />}
      {page === "controls" && <ControlsPage setPage={setPage} currentCourse={currentCourse} setCurrentCourse={setCurrentCourse} />}
    </>
  )
}

export default App
