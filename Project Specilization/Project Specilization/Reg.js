document.getElementById('registrationForm').addEventListener('submit', function(event) {
  const phoneNumber = document.getElementById('phonenumber').value;
  const phonePattern = /^[0-9]{10}$/; // Adjust this regex according to your requirements

  if (!phonePattern.test(phoneNumber)) {
    alert('Please enter a valid 10-digit phone number.');
    event.preventDefault(); // Prevent form submission
  }
});

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
  field.setAttribute('type', type);
}




// document.addEventListener('DOMContentLoaded', function() {
//     const signupForm = document.getElementById('signupForm');
  
//     if (signupForm) {
//       signupForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirm-password').value;
  
//         if (password !== confirmPassword) {
//           alert('Passwords do not match!');
//           return;
//         }
  
//         // Add your signup logic here
//         console.log('Name:', name);
//         console.log('Email:', email);
//         console.log('Password:', password);
  
//         // Simulate a successful signup
//         alert('Signup successful!');
//       });
//     }
//   });

  