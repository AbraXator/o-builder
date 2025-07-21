declare global {
  enum ControlTypes {
    START = "start",
    CONTROL = "control",
    FINISH = "finish"
  }

  type ControlType = typeof ControlTypes[keyof typeof ControlTypes];
  
  enum Pages {
    MAIN = "main",
    CREATE_COURSE = "createCourse",
    RECENT = "recent",
    MAP = "map",
    ITEMS = "items",
    CONTROLS = "controls",
    ROUTES = "routes",
  }

  type Page = typeof Pages[keyof typeof Pages];

  interface Window {
    mapView?: any;
  }

  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}

export { }