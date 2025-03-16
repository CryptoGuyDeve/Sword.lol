"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Views = () => {
  const [views, setViews] = useState<number>(0);
  const pathname = usePathname();
  const username = pathname.split("/").pop(); // Extract the username from the URL

  useEffect(() => {
    if (!username) return;

    const request = indexedDB.open("viewsDB", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("views")) {
        db.createObjectStore("views");
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("views", "readwrite");
      const store = transaction.objectStore("views");

      const getRequest = store.get(username);

      getRequest.onsuccess = () => {
        const currentViews = getRequest.result || 0; // If not found, set to 0
        const newViews = currentViews + 1;

        setViews(newViews); // Update the state
        store.put(newViews, username); // Update in the database
      };

      getRequest.onerror = (event) => {
        console.error("Error fetching views:", event);
      };
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event);
    };
  }, [username]);

  return (
    <div className="text-white text-xl font-semibold">
      Views: {views}
    </div>
  );
};

export default Views;
