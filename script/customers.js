const API_URL = "https://localhost:5001/api/customer";

document.addEventListener("DOMContentLoaded", loadCustomers);

async function loadCustomers() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const table = document.getElementById("customerTable");
    table.innerHTML = "";

    data.forEach(c => {
        const row = `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td><button onclick="deleteCustomer(${c.id})">Delete</button></td>
      </tr>
    `;
        table.innerHTML += row;
    });
}

async function addCustomer() {
    const customer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    loadCustomers();
}

async function deleteCustomer(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadCustomers();
}