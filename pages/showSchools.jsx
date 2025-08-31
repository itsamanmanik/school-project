import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

useEffect(() => {
  fetch("/api/getSchools")
    .then(res => res.json())
    .then(data => {
      // Ensure it's always an array
      if (Array.isArray(data)) {
        setSchools(data);
      } else {
        setSchools([]); // fallback to empty array
      }
    })
    .catch(err => {
      console.error("Error fetching schools:", err);
      setSchools([]);
    });
}, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {schools.map((school) => (
        <div key={school.id} className="border p-2 rounded shadow">
          <img src={school.image} alt={school.name} className="w-full h-40 object-cover"/>
          <h2 className="font-bold">{school.name}</h2>
          <p>{school.address}</p>
          <p>{school.city}</p>
        </div>
      ))}
    </div>
  );
}
