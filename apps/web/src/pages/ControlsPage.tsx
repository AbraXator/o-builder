import { appState } from "../../../../libs/state/store";
import { Pages } from "../types/enums";

function ControlsGrid() {
  const currentCourse = appState((s) => s.currentCourse);

  return (
    <div className="grid grid-row-3 gap-0 grid-cols-8 border-2">
      <div className="border border-b-2 col-span-8 text-center font-bold">{currentCourse.name}</div>

      <div className="border border-b-2 col-span-3 text-center font-bold">{currentCourse.name}</div>
      <div className="border border-2 col-span-3 text-center font-bold">{currentCourse.name}</div>
      <div className="border border-b-2 col-span-2 text-center font-bold">{currentCourse.name}</div>


    </div>
  )
}

function ControlsPage() {
  const setPage = appState((s) => s.setPage);

  return (
    <div className="h-[100dvh] w-full">
      <div className="flex flex-row justify-left items-center p-4 w-full h-16 bg-zinc-100 shadow-lg">
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setPage(Pages.MAP)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" /></svg>
        </button>
      </div>

      <ControlsGrid />
    </div>
  )
}

export default ControlsPage;