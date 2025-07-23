import { Pages, ControlTypes } from "../enums";

declare global {
  type ControlType = typeof ControlTypes[keyof typeof ControlTypes];

  type Page = typeof Pages[keyof typeof Pages];

  interface Window {
    mapView?: any;
  }

  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}

export { }