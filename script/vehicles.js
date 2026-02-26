const API_URL = "https://localhost:5001/api/vehicle";

document.addEventListener("DOMContentLoaded", loadVehicles);

async function loadVehicles() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const table = document.getElementById("vehicleTable");
    table.innerHTML = "";

    data.forEach(v => {
        const row = `
      <tr>
        <td>${v.plateNumber}</td>
        <td>${v.type}</td>
        <td>${v.capacity}</td>
        <td>
          <button onclick="deleteVehicle(${v.id})">Delete</button>
        </td>
      </tr>
    `;
        table.innerHTML += row;
    });
}

async function addVehicle() {
    const vehicle = {
        plateNumber: document.getElementById("plate").value,
        type: document.getElementById("type").value,
        capacity: Number(document.getElementById("capacity").value)
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicle)
    });

    loadVehicles();
}

async function deleteVehicle(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadVehicles();
}