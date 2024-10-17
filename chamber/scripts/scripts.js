// Toggle Menu
const hamburgerElement = document.querySelector('#hamburger-menu');
const navElement = document.querySelector('#menu');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open')
});

// Update Last Modified Date and Current Year
const lastModifiedDate = new Date(document.lastModified);
const formattedDate = lastModifiedDate.toLocaleString();
document.getElementById('last-updated').textContent = formattedDate;

const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;

// Members Grid/List Toggle and Fetch Data
document.addEventListener('DOMContentLoaded', () => {
    const companyCardsDiv = document.getElementById('company-cards');
    const viewGridButton = document.getElementById('view-grid');
    const viewListButton = document.getElementById('view-list');
    let membersData = [];
    
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            membersData = await response.json();
            renderMembers();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function renderMembers(viewType = 'grid') {
        companyCardsDiv.innerHTML = '';
        companyCardsDiv.className = '';

        companyCardsDiv.classList.add(viewType);

        membersData.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" class="member-logo">
                <h2>${member.name}</h2>
                <p>ADDRESS: ${member.address}</p>
                <p>PHONE: ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Company Website</a></p>
                <p>FOUNDED: ${member.founded}</p>
                <p>INDUSTRY: ${member.industry}</p>
            `;

            companyCardsDiv.appendChild(memberCard);
        });
    }

    viewGridButton.addEventListener('click', () => {
        renderMembers('grid');
    });

    viewListButton.addEventListener('click', () => {
        renderMembers('list');
    });

    fetchMembers();
});

// FullCalendar Events
$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: [
            {
                title: 'Weekly Internal Team Meeting',
                start: '2024-10-11'
            },
            {
                title: 'Business Networking Luncheon',
                start: '2024-10-15'
            },
            {
                title: 'Economic Developmental Conference',
                start: '2024-10-23'
            },
            {
                title: 'Small Business Workshop: Marketing Strategies',
                start: '2024-10-28'
            },
            {
                title: 'Monthly Chamber Board Meeting',
                start: '2024-11-01'
            },
            {
                title: 'Local Business Expo',
                start: '2024-11-05'
            }
        ]        
    });
});

// Visit Message and Last Visit Alert
document.addEventListener('DOMContentLoaded', () => {
    const visitAlert = document.getElementById('visit-alert');
    const visitMessage = document.getElementById('visit-message');
    const closeAlert = document.getElementById('close-alert');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    // If lastVisit is null, it's the user's first visit
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        visitAlert.style.display = "block";
    } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        if (timeDifference < 1000 * 60 * 60 * 24) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
        visitAlert.style.display = "block";
    }

    // Store current visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toString());

    // Close the alert when the user clicks the close button
    closeAlert.addEventListener('click', () => {
        visitAlert.style.display = "none";
    });
});

