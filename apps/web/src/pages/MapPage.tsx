import MapView from "../components/MapView";
import { useState } from 'react';
import IconForItem from "../helpers/IconGetter";
import { Notification, NotificationState } from "../components/Notification";
import { setCourse } from "../components/IndexedDB"
import ConfirmationModal from "../components/ConfirmationModal";
import { exportAsImage, ExportDialog } from "../components/ExportCourse";
import { appState } from "../../../../libs/state/store";
import { Pages, InteractionModes } from "../types/enums";

function UpperToolbar() {
  const currentCourseState = appState((s) => s.currentCourseState);
  const currentCourse = appState((s) => s.currentCourse);
  const updateRoute = appState((s) => s.updateRoute);
  const updateCurrentCourseState = appState((s) => s.updateCurrentCourseState);
  const setPage = appState((s) => s.setPage);

  const buttonProperties = {
    className: "flex-1 text-zinc-800 font-semibold py-2 px-4 rounded"
  };

  return (
    <div className="w-full bg-zinc-100 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 flex items-center gap-2 justify-center">
        <button className={`${currentCourseState.mode === 'selecting' ? "bg-zinc-300" : ""} flex-1 hover:bg-zinc-300 text-zinc-800 font-semibold py-2 px-4 rounded`} onClick={() => updateCurrentCourseState({ mode: InteractionModes.SELECTING })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pointer-icon lucide-pointer"><path d="M22 14a8 8 0 0 1-8 8" /><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" /><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" /><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
        </button>

        <button className={`${currentCourseState.mode === 'placing' ? "bg-zinc-300" : ""} flex-1 hover:bg-zinc-300 text-zinc-800 font-semibold py-2 px-4 rounded`} onClick={() => updateCurrentCourseState({ mode: InteractionModes.PLACING })}>
          <IconForItem selectedItem={currentCourseState.selectedControlType} />
        </button>

        <button {...buttonProperties} onClick={() => {
          setPage(Pages.ITEMS)
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23.75 23.75"
            fill="none"
            width="24"
            height="24"
          >
            <circle
              cx="5.72"
              cy="18.03"
              r="5.22"
              stroke="#ed3288"
              strokeMiterlimit="10"
            />
            <circle
              cx="18.09"
              cy="17.97"
              r="5.16"
              stroke="#ed3288"
              strokeMiterlimit="10"
            />
            <circle
              cx="18.09"
              cy="17.97"
              r="3.28"
              stroke="#ed3288"
              strokeMiterlimit="10"
            />
            <polygon
              points="6.23 10.68 11.82 1 17.41 10.68 6.23 10.68"
              stroke="#ed3088"
              strokeMiterlimit="10"
            />
          </svg>
        </button>

        <button {...buttonProperties} onClick={() => {
          if (currentCourseState.selectedControl !== undefined) {
            const routeBeingEdited = currentCourse.routes[currentCourseState.currentRoute];

            updateRoute(currentCourseState.currentRoute, {
              controls: routeBeingEdited.controls.filter((_, indexOfControl) => indexOfControl !== currentCourseState.selectedControl)
            })
            updateCurrentCourseState({
              selectedControl: undefined
            });
          }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>

        <button {...buttonProperties}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-undo-icon lucide-undo">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function LowerToolbar({ showModal, setShowModal, setNotificationState, setShowExportDialog }: {
  showModal: boolean,
  setShowModal: SetState<boolean>,
  setNotificationState: SetState<NotificationState>,
  setShowExportDialog: SetState<boolean>
}) {
  const currentCourse = appState((s) => s.currentCourse);
  const setPage = appState((s) => s.setPage);
  const saveCurrentCourse = () => {
    const id = currentCourse.id;
    if (!id) {
      console.log("Unable to save current course, missing id")
      setNotificationState({
        show: true,
        message: "Unable to save current course, please try again.",
        type: "error"
      })
      return;
    }

    setCourse(currentCourse, id)
    setNotificationState({
      show: true,
      message: "Course saved succesfully",
      type: "success"
    })
  }

  return (
    <div className="flex flex-row w-full justify-between bg-green p-1">
      <div className="flex flex-row w-full justify-center">
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => setShowModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
        </button>

        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={saveCurrentCourse}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" /></svg>
        </button>

        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-full" onClick={() => console.log("PRINT")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 12v6" /><path d="m15 15-3-3-3 3" /></svg>
        </button>
      </div>

      <div className="flex flex-row w-full justify-center">
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-xl" onClick={() => setPage(Pages.CONTROLS)}>
          Controls
        </button>
        <button className="mx-2 p-2 bg-zinc-200 hover:bg-zinc-300 rounded-xl" onClick={() => setPage(Pages.ROUTES)}>
          Routes
        </button>
      </div>
    </div>
  )
}

function MapPage() {
  const setPage = appState((s) => s.setPage);

  const [notificationState, setNotificationState] = useState<NotificationState>({
    show: false,
    message: "",
    type: "error"
  });
  const [showModal, setShowModal] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  return (
    <div className="flex flex-col justify-between h-[100dvh] overflow-hidden">
      {showModal && (<ConfirmationModal
        title={"Exit to main page?"}
        message={"Any unsaved changes will be lost"}
        confirmText={"Exit"}
        onConfirm={() => setPage(Pages.MAIN)}
        onCancel={() => setShowModal(false)} />)}
      {showExportDialog && (<ExportDialog />)}
      <div className="flex-shrink-0">
        <UpperToolbar />
      </div>
      {notificationState.show && (
        <Notification
          message={notificationState.message}
          onClose={() => setNotificationState({ show: false, message: '', type: "info" })}
          type={notificationState.type}
        />
      )}
      <div className="h-full min-h-0 flex-grow overflow-hidden">
        <MapView notificationState={notificationState} setNotificationState={setNotificationState} />
      </div>

      <div className="flex-shrink-0">
        <LowerToolbar showModal={showModal} setShowModal={setShowModal} setNotificationState={setNotificationState} setShowExportDialog={setShowExportDialog} />
      </div>
    </div>
  )
}

export default MapPage