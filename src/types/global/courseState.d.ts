declare global {
  const enum InteractionModes {
    SELECTING = "selecting",
    PLACING = "placing",
  } 

  type InteractionMode = typeof InteractionModes[keyof typeof InteractionModes];

  interface CourseState {
    selectedControlType: ControlType;
    selectedControl: number | null;
    mode: InteractionMode | null;
    currentRoute: number
  }
}

export { }