declare global {
  interface Control {
    type: ControlType;
    coords: [number, number];
  }

  interface Route {
    id: number;
    name: string;
    length: number | null;
    controls: Control[];
  }
}

export { }