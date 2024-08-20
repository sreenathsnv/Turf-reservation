document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-play-form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Retrieve form data
      const turf = document.getElementById('turf').value;
      const players = document.getElementById('players').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
  
      // Display confirmation message
      const message = `Play created on ${date} at ${time} in ${turf} for ${players} players.`;
      alert(message);
  
      // For demonstration purposes, log the data
      console.log('Turf:', turf);
      console.log('Number of Players:', players);
      console.log('Date of Play:', date);
      console.log('Time of Play:', time);
  
      // You can add further logic here to handle form submission (e.g., sending data to a server)
      // Example: AJAX request, form validation, etc.
    });
  });
  
  