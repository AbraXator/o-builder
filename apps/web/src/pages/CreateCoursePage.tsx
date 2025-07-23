import { use, useState } from "react";
import { saveCourse, getCourses } from "../components/IndexedDB"
import { appState } from "../../../../libs/state/store";
import { Pages } from "../types/enums";

interface FormData {
  courseName: string,
  courseScale: number | undefined,
  courseMap: string,
}

function CreateCoursePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    courseName: '',
    courseScale: undefined,
    courseMap: ''
  })
  const setPage = appState((s) => s.setPage);
  const setCurrentCourse = appState((s) => s.setCurrentCourse);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMapChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target && event.target.result;
      if (typeof result === "string") {
        setFormData((prev) => ({
          ...prev,
          courseMap: result,
        }));
      }
    };

    reader.onerror = (err) => {
      console.error("FileReader error: ", err);
    };

    reader.readAsDataURL(file);
  };

  const saveForm = async () => {
    console.log("Saving course...")

    if(formData.courseScale === undefined) {
      return;
    }

    await saveCourse({
      name: formData.courseName,
      scale: formData.courseScale,
      map: formData.courseMap,
      routes: [
        {
          id: 0,
          name: "",
          length: null,
          controls: [],
        }
      ]
    })

    const courses = await getCourses();
    courses.sort((a, b) => b.id - a.id);
    setCurrentCourse(courses[0])

    setPage(Pages.MAP)
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center p-4 w-full h-16 bg-zinc-100 shadow-lg">
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setPage(Pages.MAIN)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
        </button>

        <h1 className="text-lg">CREATE NEW COURSE</h1>

        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setPage(Pages.MAIN)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-center items-center p-4 gap-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <label className="whitespace-nowrap">Course name:</label>
          <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} className="bg-zinc-200 rounded border-2 border-zinc-300 mx-4 max-w-48"></input>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <label className="whitespace-nowrapy">Map file:</label>
          <input type="file" accept="image/*" name="courseMap" onChange={handleMapChange} className="bg-zinc-200 rounded border-2 border-zinc-300 mx-4 max-w-48"></input>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <label className="whitespace-nowrapy">Course scale:</label>
          <input type="number" name="courseScale" value={formData.courseScale} onChange={handleChange} className="bg-zinc-200 rounded border-2 border-zinc-300 mx-4 max-w-48">1:</input>
        </div>

        <button type="button" className="bg-zinc-200 hover:bg-zinc-300 rounded border-2 border-zinc-300 p-2 mx-4 max-w-48" onClick={() => saveForm()}>CREATE COURSE</button>
      </form>
    </div>
  )
}

export default CreateCoursePage;