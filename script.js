// Core logic for employee form and list
(() => {
  const form = document.getElementById("employeeForm");
  const nameInput = document.getElementById("name");
  const professionInput = document.getElementById("profession");
  const ageInput = document.getElementById("age");
  const msgContainer = document.getElementById("msgContainer");
  const employeesWrapper = document.getElementById("employeesWrapper");
  const employeeCount = document.getElementById("employeeCount");
  const noEntries = document.getElementById("noEntries");

  let employees = [];
  let nextId = 1;

  function render() {
    employeeCount.textContent = `Added Employees (${employees.length})`;
    employeesWrapper.innerHTML = "";
    if (employees.length === 0) {
      employeesWrapper.appendChild(noEntries);
      return;
    }

    employees.forEach(emp => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.setAttribute("data-id", emp.id);

      const info = document.createElement("div");
      info.className = "employee-info";

      const indexSpan = document.createElement("span");
      indexSpan.textContent = `${emp.id}.`;
      indexSpan.style.fontWeight = "600";
      indexSpan.style.marginRight = "6px";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = `Name: ${emp.name}`;

      const profSpan = document.createElement("span");
      profSpan.textContent = `Profession: ${emp.profession}`;

      const ageSpan = document.createElement("span");
      ageSpan.textContent = `Age: ${emp.age}`;

      info.appendChild(indexSpan);
      info.appendChild(nameSpan);
      info.appendChild(profSpan);
      info.appendChild(ageSpan);

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "Delete User";
      delBtn.setAttribute("aria-label", `Delete ${emp.name}`);
      delBtn.addEventListener("click", () => {
        deleteEmployee(emp.id);
      });

      card.appendChild(info);
      card.appendChild(delBtn);
      employeesWrapper.appendChild(card);
    });
  }

  function showMessage(text, type) {
    msgContainer.innerHTML = "";
    const div = document.createElement("div");
    div.className = "message " + (type === "error" ? "error" : "success");
    div.textContent = text;
    msgContainer.appendChild(div);
    setTimeout(() => {
      if (msgContainer.contains(div)) {
        div.style.opacity = "0";
        setTimeout(() => {
          if (msgContainer.contains(div)) msgContainer.removeChild(div);
        }, 300);
      }
    }, 2200);
  }

  function addEmployee() {
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const ageStr = ageInput.value.trim();

    if (!name || !profession || !ageStr) {
      showMessage("Error: All fields are required.", "error");
      return;
    }
    const ageNum = Number(ageStr);
    if (isNaN(ageNum) || ageNum < 0) {
      showMessage("Error: Age must be a valid non-negative number.", "error");
      return;
    }

    const newEmp = {
      id: nextId++,
      name,
      profession,
      age: ageNum
    };
    employees.push(newEmp);
    render();
    showMessage("Success: Employee Added!", "success");
    form.reset();
    nameInput.focus();
  }

  function deleteEmployee(id) {
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return;
    employees.splice(idx, 1);
    render();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    addEmployee();
  });

  // initial
  render();
})();
