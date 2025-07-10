function Toolbar() {
  return (
    <div className="w-full bg-zinc-100 sticky top-0 z-50">
      <div className="max-w-screen mx-auto px-4 flex items-center gap-2 justify-between">
        <button>
          A
        </button>
        <button>
          A
        </button>
        <button>
          A
        </button>
        <button>
          A
        </button>
        <button>
          A
        </button>
      </div>
    </div>
  )
}

function MapPage() {
  return (
    <div className="flex flex-col bg-red-900 h-screen">
      <Toolbar/>
    </div>
  )
}

export default MapPage