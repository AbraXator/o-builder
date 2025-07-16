//in src/
declare global {
  interface Control {
    type: "start" | "control" | "finish";
    coords: [number, number];
  }

  interface Route {
    id: string;
    name: string;
    length: number | null;
    controls: Control[];
  }

  interface Course {
    id: string | null;
    name: string;
    scale: number | null;
    map: string;
    routes: Route[];
    createdAt: string;
  }

  interface CourseState {
    selectedControlType: "start" | "control" | "finish";
    selectedControl: number | null;
    mode: "selecting" | "placing" | null
    currentRoute: number | null
  }

  interface Window {
    mapView?: ReturnType<typeof useMap>;
  }
}

export {};