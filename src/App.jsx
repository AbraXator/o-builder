import { useState } from 'react'
import MapPage from './pages/MapPage'
import ItemsPage from './pages/ItemsPage'
import MainMenuPage from './pages/MainMenuPage';

function App() {
  const [page, setPage] = useState('main') //main, createCourse, map, items
  const [controls, setControls] = useState([]);
  const [controlState, setControlState] = useState({
    selectedItemType: 'control', // 'start', 'control', 'finish'
    selectedControl: null, // index of the selected control
    mode: null, // 'selecting' or 'placing'
    controls: [],
  })
  const [lastAction, setLastAction] = useState([null]); // 'addControl', 'removeControl'

  return (
    <>
      {page === "main" && <MainMenuPage setPage={setPage} /> }
      {page === "map" && <MapPage setPage={setPage} controlState={controlState} setControlState={setControlState} lastAction={lastAction} setLastAction={setLastAction} />}
      {page === "items" && <ItemsPage setPage={setPage} controlState={controlState} setControlState={setControlState} />}
    </>
  )
}

export default App
