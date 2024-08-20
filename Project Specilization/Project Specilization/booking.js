// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // Select the form element
    const bookingForm = document.querySelector('form');
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Fetch form inputs
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const date = document.getElementById('date').value.trim();
      const time = document.getElementById('time').value.trim();
  
      // Simple validation
      if (name === '' || email === '' || date === '' || time === '') {
        alert('Please fill in all fields.');
        return;
      }
  
      // Example: Send form data to a backend server using fetch API
      const formData = {
        name: name,
        email: email,
        date: date,
        time: time
      };
  
      fetch('https://example.com/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful booking
        console.log('Booking successful:', data);
        alert('Booking successful!'); // Example: Show success message
        bookingForm.reset(); // Reset the form after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error occurred. Please try again later.'); // Example: Show error message
      });
    }
  
    // Add form submit event listener
    bookingForm.addEventListener('submit', handleFormSubmit);
  
  });
  