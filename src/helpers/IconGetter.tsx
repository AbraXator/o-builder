export default function IconForItem({ selectedItem }: { selectedItem: string }) {
  return (
    selectedItem === "start" ? <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23.84 20.65"
      fill="none"
      width="24"
      height="24"
    >
      <polygon
        points="1.73 19.65 11.92 2 22.11 19.65 1.73 19.65"
        stroke="#ed3088"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
      :
      selectedItem === "control" ? <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="#ed3288"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </svg>
        :
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="#ed3288"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="7"
            stroke="#ed3288"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
  )
}