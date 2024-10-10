document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const formDataList = document.getElementById('form-data-list');
    
    urlParams.forEach((value, key) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${key.replace('-', ' ').toUpperCase()}: ${value}`;
        formDataList.appendChild(listItem);
    });

    // Get the current date and time
    const timestampInput = document.getElementById('timestamp');
    const currentDate = new Date();

    // Check if the element exists and populate it with the current date and time
    if (timestampInput) {
        const formattedDate = currentDate.toISOString(); // Format as YYYY-MM-DDTHH:MM:SSZ
        timestampInput.value = formattedDate;
    }
});
