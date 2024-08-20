document.addEventListener('DOMContentLoaded', () => {
    fetch('api/turfs')  // Replace 'api/turfs' with the actual endpoint
      .then(response => response.json())
      .then(data => {
        const turfList = document.querySelector('.turf-list');
        data.forEach(turf => {
          const turfDiv = document.createElement('div');
          turfDiv.className = 'turf';
          turfDiv.innerHTML = `
            <h3>${turf.name}</h3>
            <p>Location: ${turf.location}</p>
            <p>Price: $${turf.price}</p>
            <button onclick="bookTurf(${turf.id})">Book Now</button>
          `;
          turfList.appendChild(turfDiv);
        });
      });
  
    fetch('api/recommendations')  // Replace 'api/recommendations' with the actual endpoint
      .then(response => response.json())
      .then(data => {
        const recommendationList = document.querySelector('.recommendation-list');
        data.forEach(turf => {
          const recommendationDiv = document.createElement('div');
          recommendationDiv.className = 'recommendation';
          recommendationDiv.innerHTML = `
            <h3>${turf.name}</h3>
            <p>Location: ${turf.location}</p>
            <p>Price: $${turf.price}</p>
            <button onclick="bookTurf(${turf.id})">Book Now</button>
          `;
          recommendationList.appendChild(recommendationDiv);
        });
      });
  });
  
  function bookTurf(turfId) {
    // Code to handle booking, e.g., redirect to booking page or show booking form
    alert(`Booking turf with ID: ${turfId}`);
  }


//to load more ....................
  function loadMoreRecommendations() {
    const recommendations = [
      { name: "Turf D", location: "PQR Area", rating: "4.6/5" },
      { name: "Turf E", location: "STU Area", rating: "4.3/5" },
      { name: "Turf F", location: "VWX Area", rating: "4.7/5" }
    ];
  
    const recommendationList = document.querySelector('.recommendation-list');
  
    recommendations.forEach(rec => {
      const recommendationBox = document.createElement('div');
      recommendationBox.className = 'recommendation-box';
  
      const h3 = document.createElement('h3');
      h3.textContent = rec.name;
  
      const p1 = document.createElement('p');
      p1.textContent = `Location: ${rec.location}`;
  
      const p2 = document.createElement('p');
      p2.textContent = `Rating: ${rec.rating}`;
  
      const button = document.createElement('button');
      button.textContent = 'Book Now';
      button.onclick = () => window.location.href = 'bookings.html';
  
      recommendationBox.appendChild(h3);
      recommendationBox.appendChild(p1);
      recommendationBox.appendChild(p2);
      recommendationBox.appendChild(button);
  
      recommendationList.appendChild(recommendationBox);
    });
  }
 
  
     // Function to handle search input..........................// 
  document.addEventListener('DOMContentLoaded', () => {
    // Function to handle search input
    const handleSearchInput = () => {
      const searchInput = document.querySelector('.search input[type="text"]');
      const filter = searchInput.value.toLowerCase();
      const recommendationBoxes = document.querySelectorAll('.recommendation-box');
  
      recommendationBoxes.forEach(box => {
        const turfName = box.getAttribute('data-turf').toLowerCase();
        const displayStyle = turfName.includes(filter) ? 'block' : 'none';
        box.style.display = displayStyle;
      });
    };
  
    // Event listener for input changes in search box
    document.querySelector('.search input[type="text"]').addEventListener('input', handleSearchInput);
  });
  
  function loadMoreRecommendations() {
    const recommendations = [
      { name: "Turf D", location: "PQR Area", rating: "4.6/5" },
      { name: "Turf E", location: "STU Area", rating: "4.3/5" },
      { name: "Turf F", location: "VWX Area", rating: "4.7/5" }
    ];
  
    const recommendationList = document.querySelector('.recommendation-list');
  
    recommendations.forEach(rec => {
      const recommendationBox = document.createElement('div');
      recommendationBox.className = 'recommendation-box';
      recommendationBox.setAttribute('data-turf', rec.name); // Add data-turf attribute
  
      const h3 = document.createElement('h3');
      h3.textContent = rec.name;
  
      const p1 = document.createElement('p');
      p1.textContent = `Location: ${rec.location}`;
  
      const p2 = document.createElement('p');
      p2.textContent = `Rating: ${rec.rating}`;
  
      const button = document.createElement('button');
      button.textContent = 'Book Now';
      button.onclick = () => window.location.href = 'booking.html';
  
      recommendationBox.appendChild(h3);
      recommendationBox.appendChild(p1);
      recommendationBox.appendChild(p2);
      recommendationBox.appendChild(button);
  
      recommendationList.appendChild(recommendationBox);
    });
  }
  
  
  /*......................js chatbot.......................*/
  document.getElementById('chatbot-header').addEventListener('click', () => {
    const chatbot = document.getElementById('chatbot');
    if (chatbot.classList.contains('minimized')) {
      chatbot.classList.remove('minimized');
      chatbot.style.height = '300px';
    } else {
      chatbot.classList.add('minimized');
      chatbot.style.height = '40px';
    }
  });
  
  document.getElementById('chatbot-send').addEventListener('click', sendMessage);
  
  document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message === '') return;
    
    addMessageToChat('You', message);
    input.value = '';
  
    // Send message to ChatGPT API
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.choices && data.choices.length > 0) {
        const reply = data.choices[0].text.trim();
        addMessageToChat('4play', reply);
      } else {
        addMessageToChat('4play', 'Sorry, I am having trouble responding right now.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      addMessageToChat('4play', 'Sorry, I am having trouble responding right now.');
    });
  }
  
  function addMessageToChat(sender, message) {
    const messages = document.getElementById('chatbot-messages');
    const messageElem = document.createElement('div');
    messageElem.textContent = `${sender}: ${message}`;
    messages.appendChild(messageElem);
    messages.scrollTop = messages.scrollHeight;
  }
  