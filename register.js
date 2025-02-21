// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL2AQHcAnIKyWOYrr7EFF7bKNUgDcRA8U",
  authDomain: "login-example-5d317.firebaseapp.com",
  projectId: "login-example-5d317",
  storageBucket: "login-example-5d317.appspot.com",
  messagingSenderId: "420133946976",
  appId: "1:420133946976:web:3ed1b67532c20ef8c86505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to load before selecting elements
document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById('Register');
    
    if (submit) {
        submit.addEventListener("click", function (event) {
            event.preventDefault();
            
            // Get input values inside the event listener
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password:", password);
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                alert("Account created successfully!");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert(error.message);
            });

        });
    } else {
        console.error("Register button not found!");
    }
});
