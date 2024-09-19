document.getElementById("hamburger-menu").addEventListener("click", function() {
    const navMenu = document.querySelector("nav ul");
    navMenu.classList.toggle("show");
});

const lastModifiedDate = new Date(document.lastModified);

const formattedDate = lastModifiedDate.toLocaleString();

document.getElementById('last-updated').textContent = formattedDate;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in website design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects, and encapsulation at a conceptual level.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

function displayCourses(filter = 'All') {
    const coursesArea = document.querySelector('.courses-area');
    coursesArea.innerHTML = '';

    const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.subject === filter);
    filteredCourses.forEach(course => {
        const button = document.createElement('button');
        button.textContent = `${course.subject}${course.number}`;

        if (course.completed) {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
        }

        coursesArea.appendChild(button);
    });
}

function displayTotalCredits() {
    const cardTitleDiv = document.querySelector('.course-list-card .card-title');
    
    const totalCreditsParagraph = document.createElement('p');
    totalCreditsParagraph.textContent = `Total of Credits: ${totalCredits}`;
    totalCreditsParagraph.style.color = 'white';
    totalCreditsParagraph.style.fontSize = '1.5rem';
    
    const heading = cardTitleDiv.querySelector('h1');
    cardTitleDiv.insertBefore(totalCreditsParagraph, heading.nextSibling);
}

document.querySelectorAll('.filter-area button').forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.textContent;
        displayCourses(filter);
    });
});

displayCourses();
displayTotalCredits();
