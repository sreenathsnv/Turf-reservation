

document.getElementById('edit-details').addEventListener('click', function() {
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <div class="edit-form">
            <h3>Edit Details</h3>
            <label for="edit-name">Name:</label>
            <input type="text" id="edit-name" value="${document.getElementById('user-name').textContent}">
            <label for="edit-location">Location:</label>
            <input type="text" id="edit-location" value="${document.getElementById('user-location').textContent.replace('Location: ', '')}">
            <label for="edit-sport">Favorite Sport:</label>
            <input type="text" id="edit-sport" value="${document.getElementById('user-favorite-sport').textContent.replace('Favorite Sport: ', '')}">
            <button id="save-details">Save</button>
            <button id="cancel-edit">Cancel</button>
        </div>
    `;

    document.body.appendChild(editForm);

    document.getElementById('save-details').addEventListener('click', function() {
        const userName = document.getElementById('edit-name').value;
        const userLocation = document.getElementById('edit-location').value;
        const userFavoriteSport = document.getElementById('edit-sport').value;

        if (userName) document.getElementById('user-name').textContent = userName;
        if (userLocation) document.getElementById('user-location').textContent = 'Location: ' + userLocation;
        if (userFavoriteSport) document.getElementById('user-favorite-sport').textContent = 'Favorite Sport: ' + userFavoriteSport;

        document.body.removeChild(editForm);
    });

    document.getElementById('cancel-edit').addEventListener('click', function() {
        document.body.removeChild(editForm);
    });
});

document.getElementById('profile-pic').addEventListener('click', function() {
    document.getElementById('upload-profile-pic').click();
});

document.getElementById('add-profile-pic').addEventListener('click', function() {
    document.getElementById('upload-profile-pic').click();
});

document.getElementById('upload-profile-pic').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('toggle-bookings').addEventListener('click', function() {
    const bookingDetails = document.getElementById('booking-details');
    if (bookingDetails.classList.contains('hidden')) {
        bookingDetails.classList.remove('hidden');
        this.textContent = 'Hide Bookings';
    } else {
        bookingDetails.classList.add('hidden');
        this.textContent = 'Show Bookings';
    }
});

/*.................view card.....................*/

document.getElementById('view-player-card').addEventListener('click', function() {
    const playerCard = document.getElementById('player-card-container');
    if (playerCard.classList.contains('hidden')) {
        playerCard.classList.remove('hidden');
        this.textContent = 'Hide Player Card';
    } else {
        playerCard.classList.add('hidden');
        this.textContent = 'View Player Card';
    }
});

/*.................................... player rating showing..............................*/

// Example player ratings
const playerRatings = {
    pace: 85,
    shooting: 80,
    passing: 75,
    dribbling: 90,
    defending: 70,
    physical: 78,
};

// Calculate overall rating as an average of all ratings
const overallRating = Math.round(
    (playerRatings.pace +
    playerRatings.shooting +
    playerRatings.passing +
    playerRatings.dribbling +
    playerRatings.defending +
    playerRatings.physical) / 6
);

// Set the ratings in the HTML
document.getElementById('overall-rating').textContent = overallRating;
document.getElementById('pace').textContent = playerRatings.pace;
document.getElementById('shooting').textContent = playerRatings.shooting;
document.getElementById('passing').textContent = playerRatings.passing;
document.getElementById('dribbling').textContent = playerRatings.dribbling;
document.getElementById('defending').textContent = playerRatings.defending;
document.getElementById('physical').textContent = playerRatings.physical;

