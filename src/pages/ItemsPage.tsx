import { appState } from "../store";
import { Pages, ControlTypes } from "../types/enums";


function ControlTypeButton({ type, children }: { type: ControlType, children: any }) {
  const setPage = appState((s) => s.setPage);
  const currentCourseState = appState((s) => s.currentCourseState)

  const handleItemClick = (item: ControlType) => {
    appState((s) => s.updateCurrentCourseState({ selectedControlType: item }));
    setPage(Pages.MAP);
  };

  return (
    <button className={`${currentCourseState.selectedControlType === type ? "bg-zinc-400" : "bg-zinc-200"} bg-zinc-200 py-2 px-4 rounded`} onClick={() => handleItemClick(type)}>
      {children}
    </button>
  )
}

export default function ItemsPage() {
  const setPage = appState((s) => s.setPage);

  return (
    <div className="flex flex-col justify-between w-screen h-screen">

      <div className="flex flex-row items-center justify-center px-4 py-2">
        <h1 className="text-lg font-semibold">ITEMS</h1>
      </div>

      <div className="flex flex-row items-center justify-between px-4 py-2">
        <ControlTypeButton type={ControlTypes.START}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,4 20,20 4,20" stroke="#c01a6e" strokeWidth="2" fill="none" />
          </svg>
        </ControlTypeButton>

        <ControlTypeButton type={ControlTypes.CONTROL}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="#c01a6e" strokeWidth="2" fill="none" />
          </svg>
        </ControlTypeButton>

        <ControlTypeButton type={ControlTypes.FINISH}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#c01a6e" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#c01a6e" strokeWidth="2" fill="none" />
          </svg>
        </ControlTypeButton>
      </div>

      <div className="flex flex-row w-full items-center justify-center bg-zinc-100 py-2 px-4 z-50">
        <button className="bg-zinc-200 py-2 px-4 rounded" onClick={() => setPage(Pages.MAP)}>🗺️</button>
      </div>

    </div>
  )
}