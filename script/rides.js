const API_URL = "https://localhost:5001/api/ride";

document.addEventListener("DOMContentLoaded", () => {
    loadDropdowns();
    loadRides();
});

async function loadDropdowns() {
    const [vehicles, customers, employees] = await Promise.all([
        fetch("https://localhost:5001/api/vehicle").then(r => r.json()),
        fetch("https://localhost:5001/api/customer").then(r => r.json()),
        fetch("https://localhost:5001/api/employee").then(r => r.json())
    ]);

    const vSelect = document.getElementById("vehicleSelect");
    vehicles.forEach(v => {
        const option = document.createElement("option");
        option.value = v.id;
        option.textContent = v.plateNumber;
        vSelect.appendChild(option);
    });

    const cSelect = document.getElementById("customerSelect");
    customers.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name;
        cSelect.appendChild(option);
    });

    const eSelect = document.getElementById("employeeSelect");
    employees.forEach(e => {
        const option = document.createElement("option");
        option.value = e.id;
        option.textContent = e.name;
        eSelect.appendChild(option);
    });
}

async function loadRides() {
    const res = await fetch(API_URL);
    const rides = await res.json();

    const table = document.getElementById("rideTable");
    table.innerHTML = "";

    rides.forEach(r => {
        const row = `
      <tr>
        <td>${r.vehicle?.plateNumber}</td>
        <td>${r.customer?.name}</td>
        <td>${r.employee?.name}</td>
        <td>${r.startLocation}</td>
        <td>${r.endLocation}</td>
        <td><button onclick="deleteRide(${r.id})">Delete</button></td>
      </tr>
    `;
        table.innerHTML += row;
    });
}

async function addRide() {
    const ride = {
        vehicleId: document.getElementById("vehicleSelect").value,
        customerId: document.getElementById("customerSelect").value,
        employeeId: document.getElementById("employeeSelect").value,
        startLocation: document.getElementById("pickup").value,
        endLocation: document.getElementById("destination").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ride)
    });

    loadRides();
}

async function deleteRide(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadRides();
}