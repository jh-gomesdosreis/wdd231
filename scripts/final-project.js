function redirectToDemo() {
    window.location.href = "contact-us.html";
}

document.addEventListener('DOMContentLoaded', () => {
    function updateDemoCount() {
        let demoCount = localStorage.getItem('demoCount');
        if (demoCount === null) {
            demoCount = 0;
        } else {
            demoCount = parseInt(demoCount, 10);
        }
        demoCount += 1;
        localStorage.setItem('demoCount', demoCount);
        const demoCountElement = document.getElementById('demo-count');
        if (demoCountElement) {
            demoCountElement.textContent = demoCount;
        }
    }

    if (window.location.pathname.includes('complete.html')) {
        updateDemoCount();
    }
});




