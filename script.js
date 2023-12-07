document.addEventListener('DOMContentLoaded', () => {
  // Fetch employee data
  fetch('employee.json')
    .then(response => response.json())
    .then(employeeData => {
      // Fetch schedule data
      fetch('schedule.xml')
        .then(response => response.text())
        .then(scheduleData => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(scheduleData, 'application/xml');

          // Create a table for the schedule
          const scheduleTable = document.createElement('table');
          scheduleTable.classList.add('scheduleTable');

          // Create table headers
          const tableHeaderRow = scheduleTable.insertRow(0);
          const employeeNameHeader = document.createElement('th');
          employeeNameHeader.textContent = 'Employee Name';
          tableHeaderRow.appendChild(employeeNameHeader);

          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            th.classList.add('dayOfWeek'); // Add class to days of the week cells
            tableHeaderRow.appendChild(th);
          });

          const employeeNameToRowIndex = {}; // Map employee name to rowIndex

          // Process schedule data
          xmlDoc.querySelectorAll('shift').forEach(shift => {
            const employeeId = shift.querySelector('employeeId').textContent;
            const day = shift.querySelector('day').textContent;
            const startTime = shift.querySelector('startTime').textContent;
            const endTime = shift.querySelector('endTime').textContent;

            const employee = employeeData.employees.find(emp => emp.id.toString() === employeeId);

            if (employee) {
              const employeeName = employee.name;

              // Check if the employee name has an assigned rowIndex, if not, create a new row
              if (!employeeNameToRowIndex[employeeName]) {
                const scheduleRow = scheduleTable.insertRow();
                const nameCell = scheduleRow.insertCell(0); // Insert at the beginning
                nameCell.textContent = employeeName;
                employeeNameToRowIndex[employeeName] = scheduleRow.rowIndex;

                // Create cells for all days of the week
                daysOfWeek.forEach(() => {
                  scheduleRow.insertCell();
                });
              }

              // Find the index of the day and add the schedule information to the corresponding cell
              const dayIndex = daysOfWeek.indexOf(day);
              const rowIndex = employeeNameToRowIndex[employeeName];

              const cell = scheduleTable.rows[rowIndex].cells[dayIndex + 1]; // +1 to skip the name cell
              // Update the cell content without "Shift"
              cell.innerHTML += `
                <div class="scheduleItem">
                  <p>${startTime} - ${endTime}</p>
                </div>
              `;
            }
          });

          const scheduleReportDiv = document.getElementById('scheduleReport');
          scheduleReportDiv.appendChild(scheduleTable);

          // Example: Use jQuery to change the background color of the h1 element
          $('h1').css('background-color', '#f0f0f0');

          // Example: Attach a click event handler to the employeeInfo div
          $('#employeeInfo').on('click', function () {
            alert('Employee info clicked!');
          });

          // Render React component with employee data
          const employees = employeeData.employees;
          ReactDOM.render(<EmployeeList employees={employees} />, document.getElementById('employeeInfo'));
        })
        .catch(error => console.error('Error loading schedule data:', error));
    })
    .catch(error => console.error('Error loading employee data:', error));
});

// React component to display employee information
function EmployeeList({ employees }) {
  return (
    <div>
      <h2>Employee Information</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            <strong>ID:</strong> {employee.id}<br />
            <strong>Name:</strong> {employee.name}<br />
            <strong>Position:</strong> {employee.position}<br />
            <strong>Department:</strong> {employee.department}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}



