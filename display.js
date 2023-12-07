document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from local JSON file
    fetch('api-data.json')
        .then(response => response.json())
        .then(data => {
            // Generate HTML content for employee information
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
        .catch(error => console.error('Error fetching employee data:', error));

    // jQuery code for hiding and showing elements
    $("#hideButton").click(function () {
        $("#targetElement").hide();
    });

    $("#showButton").click(function () {
        $("#targetElement").show();
    });

    // Simulating AJAX Request using jQuery (replace with actual API endpoint)
    $(document).ready(function () {
        $.ajax({
            url: 'https://example.com/api/employee', // Replace with your actual API endpoint
            method: 'GET',
            success: function (data) {
                console.log('Data received:', data);
                // Handle the data as needed
            },
            error: function (error) {
                console.error('Error fetching API data:', error);
            }
        });
    });
});
