export function getControlsFromRoute(course: Course, route: number) {
  return course.routes[route].controls;
}