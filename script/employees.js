const API_URL = "https://localhost:5001/api/employee";

document.addEventListener("DOMContentLoaded", loadEmployees);

async function loadEmployees() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    data.forEach(e => {
        const row = `
      <tr>
        <td>${e.name}</td>
        <td>${e.role}</td>
        <td>${e.contact}</td>
        <td><button onclick="deleteEmployee(${e.id})">Delete</button></td>
      </tr>
    `;
        table.innerHTML += row;
    });
}

async function addEmployee() {
    const employee = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        contact: document.getElementById("contact").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });

    loadEmployees();
}

async function deleteEmployee(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadEmployees();
}