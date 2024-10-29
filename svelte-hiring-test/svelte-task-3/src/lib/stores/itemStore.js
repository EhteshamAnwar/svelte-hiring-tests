import { writable } from "svelte/store";

const items = [
    { id: 1, title: "Item 1", description: "First item description" },
    { id: 2, title: "Item 2", description: "Second item description" },
    { id: 3, title: "Item 3", description: "Third item description" }
  ];

  export const itemsStore = writable(items);