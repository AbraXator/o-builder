import { openDB } from "idb";

export const initDB = async () => {
  return openDB('OBuilderDB', 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('courses')) {
        const store = db.createObjectStore('courses', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('name', 'name');
      }
    },
  });
};

export const saveCourse = async (courseData: Course) => {
  const db = await initDB();
  await db.put('courses', {
    ...courseData,
    createdAt: new Date(),
  });
};

export const setCourse = async (courseData: Course, id: number) => {
  const db = await initDB();
  await db.put('courses', {...courseData, id})
}

export const getCourses = async () => {
  const db = await initDB();
  return await db.getAll('courses');
}

export const deleteCourse = async (id: number) => {
  const db = await initDB();
  return await db.delete('courses', id);
}