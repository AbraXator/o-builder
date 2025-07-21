import { useState, useEffect } from 'react';
import MapPage from './pages/MapPage';
import ItemsPage from './pages/ItemsPage'
import MainMenuPage from './pages/MainMenuPage';
import CreateCoursePage from './pages/CreateCoursePage';
import RecentCoursesPage from './pages/RecentCoursesPage';
import ControlsPage from './pages/ControlsPage';
import { appState } from './store';

function App() {
  const [lastAction, setLastAction] = useState([null]); // 'addControl', 'removeControl'
  const page = appState(s => s.page);
  
  return (
    <>
      {page === "main" && <MainMenuPage/> }
      {page === "createCourse" && <CreateCoursePage />}
      {page === "recent" && <RecentCoursesPage />}
      {page === "map" && <MapPage />}
      {page === "items" && <ItemsPage />}
      {page === "controls" && <ControlsPage />}
    </>
  )
}

export default App
