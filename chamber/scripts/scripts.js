const hamburgerElement = document.querySelector('#hamburger-menu');
const navElement = document.querySelector('#menu');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open')
});

const lastModifiedDate = new Date(document.lastModified);
const formattedDate = lastModifiedDate.toLocaleString();
document.getElementById('last-updated').textContent = formattedDate;


const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;

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

//calendar widget
console.log("jQuery version:", $.fn.jquery);
$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: [
            {
                title: 'Meeting with team',
                start: '2024-10-15'
            },
            {
                title: 'Birthday party',
                start: '2024-10-20'
            },
            {
                title: 'Conference',
                start: '2024-10-22'
            }
        ]
    });
});
