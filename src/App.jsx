import { useState } from 'react'
import MapPage from './pages/MapPage'
import ItemsPage from './pages/ItemsPage'
import MainMenuPage from './pages/MainMenuPage';
import CreateCoursePage from './pages/CreateCoursePage';

function App() {
  const [page, setPage] = useState('createCourse') //main, createCourse, map, items
  const [controls, setControls] = useState([]);
  const [controlState, setControlState] = useState({
    selectedItemType: 'control', // 'start', 'control', 'finish'
    selectedControl: null, // index of the selected control
    mode: null, // 'selecting' or 'placing'
  })
  const [currentCourse, setCurrentCourse] = useState({
    id: null,
    name: "",
    scale: null,
    map: "",
    controls: [{
      type: "",
      coords: [] 
    }],
    createdAt: ""
  })
  const [lastAction, setLastAction] = useState([null]); // 'addControl', 'removeControl'

  return (
    <>
      {page === "main" && <MainMenuPage setPage={setPage} /> }
      {page === "createCourse" && <CreateCoursePage setPage={setPage} setCurrentCourse={setCurrentCourse} />}
      {page === "map" && <MapPage setPage={setPage} controlState={controlState} setControlState={setControlState} currentCourse={currentCourse} setCurrentCourse={setCurrentCourse} />}
      {page === "items" && <ItemsPage setPage={setPage} controlState={controlState} setControlState={setControlState} />}
    </>
  )
}

export default App
