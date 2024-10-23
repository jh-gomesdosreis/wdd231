document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('open-dialog-button');
    const closeButton = document.getElementById('close-dialog-button');
    const dialog = document.getElementById('employee-popup');
    const employeeCardsContainer = document.getElementById('employee-cards');

    const detailsDialog = document.getElementById('employee-details-dialog');
    const closeDetailsButton = document.getElementById('close-details-dialog-button');
    const employeeName = document.getElementById('employee-name');
    const employeeLocation = document.getElementById('employee-location');
    const employeeBio = document.getElementById('employee-bio');
    const employeeHobby = document.getElementById('employee-hobby');
    const employeePicture = document.getElementById('employee-picture');  // Reference to the image element

    // Fetch the team data from the JSON file
    async function loadEmployeeData() {
        try {
            const response = await fetch('scripts/our-team.json');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const employees = await response.json();
            employees.forEach(employee => {
                const card = document.createElement('div');
                card.classList.add('employee-card');
                card.innerHTML = `
                    <img loading="lazy" src="images/${employee.profile_picture}" alt="${employee.name}">
                    <h2>${employee.name}</h2>
                    <p><strong>Position:</strong> ${employee.position}</p>
                    <button class="know-more-button">Know more...</button>
                `;
                
                const knowMoreButton = card.querySelector('.know-more-button');
                knowMoreButton.addEventListener('click', () => {
                    showEmployeeDetails(employee);
                });

                employeeCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    function showEmployeeDetails(employee) {
        employeeName.textContent = employee.name;
        employeeLocation.textContent = employee.location;
        employeeBio.textContent = employee.bio;
        employeeHobby.textContent = employee.hobby.join(', ');
        employeePicture.src = `images/${employee.profile_picture}`;
        employeePicture.alt = employee.name;
        employeePicture.loading = "lazy";
        detailsDialog.showModal();
    }

    openButton.addEventListener('click', () => {
        employeeCardsContainer.innerHTML = ''; 
        loadEmployeeData();
        dialog.showModal(); 
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    closeDetailsButton.addEventListener('click', () => {
        detailsDialog.close();
    });
});
