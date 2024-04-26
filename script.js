document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const imageInput = document.getElementById('image');
    const captureInput = document.getElementById('capture');
    const captureValidateInput = document.getElementById('capturevalidate');
    const imageContainer = document.querySelector('.image-contaner');
    const downloadButton = document.getElementById('btn');
    const updatedButton = document.getElementById('updatedbtn');
    const clearButton = document.getElementById('clearbtn');
    const refreshButton = document.querySelector('.refreshbtn');

    // Generate a capture when the page loads
    refreshCapture();

    // Add event listener to refresh capture button
    refreshButton.addEventListener('click', function () {
        refreshCapture();
    });

    updatedButton.addEventListener('click', function () {
        const name = nameInput.value;
        const date = formatDate(dateInput.value); // Format date to "day/month/year"
        const capture = captureInput.value;
        const captureValidate = captureValidateInput.value;

        if (capture === captureValidate) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                const imageUrl = event.target.result;
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;

                const nameElement = document.createElement('p');
                nameElement.style.textAlign = 'center';
                nameElement.style.justifyContent='center';
                nameElement.textContent = ` ${name}`;

                const dateElement = document.createElement('p');
                dateElement.style.textAlign ='center'
                dateElement.style.justifyContent = 'center'
                dateElement.textContent = ` ${date}`;

                imageContainer.innerHTML = '';
                imageContainer.appendChild(imageElement);
                imageContainer.appendChild(nameElement);
                imageContainer.appendChild(dateElement);
            };

            reader.readAsDataURL(file);
        } else {
            alert('Capture validation failed!');
        }
    });

    downloadButton.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        canvas.style.border = '2px solid #333'; // Set border
        canvas.style.borderRadius = '8px'; // Rounded corners
        canvas.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add shadow
        canvas.style.marginTop = '20px'; // Add some margin at the top
        canvas.style.backgroundColor = 'white';

        const ctx = canvas.getContext('2d');
        const image = document.querySelector('.image-contaner img');

        // Set canvas dimensions for passport-sized photo
        canvas.width = 400;
        canvas.height = 350;

        // Draw white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image in passport size
        ctx.drawImage(image, 10, 10, 380, 260); // Adjusted image dimensions to fit the canvas

        // Convert name and date to uppercase
        const name = nameInput.value.toUpperCase();
        const date = formatDate(dateInput.value); // Format date to "day/month/year"

        // Draw name and date in larger capital letters at the bottom
        ctx.font = '25px Arial';
        ctx.fillStyle = '#333'; // Set text color to black
        ctx.textAlign = 'center';
        ctx.fillText(` ${name}`, canvas.width / 2, canvas.height - 50);
        ctx.fillText(` ${date}`, canvas.width / 2, canvas.height - 20);

        // Draw capture text with increased size and bold
       // ctx.font = 'bold 100px Arial'; // Increased size and bold
       // ctx.fillText(` ${captureInput.value}`, canvas.width / 2, canvas.height - 100);

        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0, 10); // Get current date
        link.download = `passport-image-${currentDate}.jpg`; // Include date in filename
        link.href = canvas.toDataURL();
        link.click();
    });

    clearButton.addEventListener('click', function () {
        nameInput.value = '';
        dateInput.value = '';
        imageInput.value = '';
        captureInput.value = '';
        captureValidateInput.value = '';
        imageContainer.innerHTML = '';
    });

    function refreshCapture() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let capture = '';

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            capture += characters[randomIndex];
        }

        document.getElementById('capture').value = capture;
        document.getElementById('capturevalidate').value = ''; // Clear validation input
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
});


