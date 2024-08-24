// Sample data for demonstration
const plays = [
    { id: 1, name: 'Play 1', turf: 'Turf 1', players: 8, time: '09:00 AM', createdBy: 'User A' },
    { id: 2, name: 'Play 2', turf: 'Turf 2', players: 6, time: '04:00 PM', createdBy: 'User B' },
    { id: 3, name: 'Play 3', turf: 'Turf 3', players: 10, time: '07:00 PM', createdBy: 'User C' }
  ];
  
  document.addEventListener('DOMContentLoaded', function() {
    const playList = document.getElementById('play-list');
  
    // Render plays
    plays.forEach(play => {
      const playCard = document.createElement('div');
      playCard.classList.add('play-card');
  
      playCard.innerHTML = `
        <h3>${play.name}</h3>
        <p><strong>Turf:</strong> ${play.turf}</p>
        <p><strong>Players:</strong> ${play.players}</p>
        <p><strong>Time:</strong> ${play.time}</p>
        <p><strong>Created By:</strong> ${play.createdBy}</p>
        <button class="join-button" data-id="${play.id}">Join</button>
      `;
  
      playCard.querySelector('.join-button').addEventListener('click', function() {
        // For demonstration, show alert with play details
        const playId = this.getAttribute('data-id');
        const selectedPlay = plays.find(play => play.id == playId);
        if (selectedPlay) {
          const message = `You have joined "${selectedPlay.name}".`;
          alert(message);
        }
      });
  
      playList.appendChild(playCard);
    });
  });
  