document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from employee.json
    fetch('employee.json')
        .then(response => response.json())
        .then(data => {
            // Generate HTML content
            let html = '<h2>Employee Information</h2><ul>';

            data.employees.forEach(employee => {
                html += `<li>
                    <strong>ID:</strong> ${employee.id}<br>
                    <strong>Name:</strong> ${employee.name}<br>
                    <strong>Position:</strong> ${employee.position}<br>
                    <strong>Department:</strong> ${employee.department}<br>
                </li>`;
            });

            html += '</ul>';

            // Display the HTML content on the page
            document.getElementById('employeeInfo').innerHTML = html;
        })
        .catch(error => console.error('Error fetching data:', error));
}); 
