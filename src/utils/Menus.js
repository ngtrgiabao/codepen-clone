import { v4 as uuidv4 } from "uuid";

export const Menus = [
  { id: uuidv4(), name: "Projects", uri: "/home/projects" },
  { id: uuidv4(), name: "Collections", uri: "/home/collection" },
  { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];
