export default function MainMenuPage({ setPage }) {
  return (
    <div className="w-screen h-full flex-col gap-16">
      <div className="my-16 mx-16 flex flex-col justify-center items-center">
        <div className="shadow-xl">
          <img src="/logo.png"></img>
        </div>

        <div className="w-full flex flex-col items-center gap-4 my-16">
          <button className="w-full bg-zinc-200 hover:bg-zinc-300 p-4 rounded-xl text-xl shadow-xl" onClick={() => setPage('createCourse')}>NEW COURSE</button>
          <button className="w-full bg-zinc-200 hover:bg-zinc-300 p-4 rounded-xl text-xl shadow-xl">RECENT COURSES</button>
          <button className="w-full bg-zinc-200 hover:bg-zinc-300 p-4 rounded-xl text-xl shadow-xl">LOAD COURSE</button>
        </div>
      </div>
    </div>
  )
}