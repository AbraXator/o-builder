import { getCourses, deleteCourse } from "../components/IndexedDB"
import ConfirmationModal from "../components/ConfirmationModal"
import { useEffect, useState } from "react";
import { appState } from "../../../../libs/state/store";
import { Notification, NotificationState } from "../components/Notification";
import { Pages } from "../types/enums";

function RecentCourseComponent() {
  const setPage = appState((s) => s.setPage);

  const [courses, setCourses] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const setCurrentCourse = appState((s) => s.setCurrentCourse);

  const fetchCourse = async () => {
    const courses = await getCourses();
    if (courses.length > 0) {
      setCourses(courses)
    } else { 
      setCourses("-")
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!courses) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Loading courses...</h1>
      </div>
    )
  }

  if (courses === "-") {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>No recent courses</h1>
      </div>
    )
  }

  const deleteClickedCourse = async () => {
    if (!courseToDelete?.id) return;

    try {
      await deleteCourse(courseToDelete.id);
      await fetchCourse();
    } catch (err) {
      console.error("Failed to delete course")
    } finally {
      setShowModal(false)
      setCourseToDelete(null)
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full max-w-4xl mx-auto my-4">
      {showModal && (<ConfirmationModal
        title={"Delete Course?"}
        message={`Are you sure you want to delete course: ${courseToDelete ? courseToDelete.name : ""}?`}
        confirmText={"Delete"}
        onConfirm={deleteClickedCourse}
        onCancel={() => setShowModal(false)} />)}
      {Array.isArray(courses) && courses.map((course, i) => (
        <div key={i} className="flex flex-col justify-center items-center w-full lg:max-w-64 bg-zinc-200 shadow-lg p-4 rounded">
          <div className="flex flex-col justify-between items-center">
            <h1>{course.name}</h1>
            <p>{course.scale}</p>
          </div>

          <img className="h-48 w-full object-contain" src={course.map} alt={`Map ${i}`} />

          <div className="flex flex-row justify-between gap-2 mx-4">
            <button className="mx-2 p-2 bg-zinc-300 hover:bg-zinc-400 rounded-full cursor-pointer" onClick={() => {
              setCourseToDelete(course);
              setShowModal(true)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            <button className="mx-2 p-2 bg-zinc-300 hover:bg-zinc-400 rounded-full cursor-pointer" onClick={() => {
              setCurrentCourse(course);
              setPage(Pages.MAP);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
            </button>
          </div>
        </div>
      ))}
    </div>


  )
}

function RecentCoursesPage() {
  const setPage = appState((s) => s.setPage);

  return (
    <div className="flex flex-col w-full h-full justify-center overflow-hidden">
      <div className="flex flex-row justify-between items-center p-4 w-full h-16 bg-zinc-100 shadow-lg">
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setPage(Pages.MAIN)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
        </button>

        <h1 className="text-lg">RECENT COURSES</h1>

        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setPage(Pages.MAIN)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      </div>

      <div>
        <RecentCourseComponent />
      </div>
    </div>
  )
}

export default RecentCoursesPage