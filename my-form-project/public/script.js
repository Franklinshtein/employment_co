document.querySelector('.burger').addEventListener('click', function(){
    this.classList.toggle('active');
    document.querySelector('.header-nav').classList.toggle('open');
});

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Get form data
    const formJSON = {}; // Convert FormData to JSON
    formData.forEach((value, key) => {
        formJSON[key] = value;
    });

    try {
        // Send POST request to the server
        const response = await fetch('http://localhost:3001/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formJSON),
        });

        const result = await response.json(); // Parse JSON response
        console.log(result);

        // Display success message
        const messageElement = document.getElementById('responseMessage');
        messageElement.style.display = 'block';
        messageElement.textContent = result.message || 'Form submitted successfully!';
        messageElement.style.color = 'green';

        // Clear form fields
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error submitting form:', error);

        // Display error message
        const messageElement = document.getElementById('responseMessage');
        messageElement.style.display = 'block';
        messageElement.textContent = 'Error submitting the form. Please try again.';
        messageElement.style.color = 'red';
    }
});
