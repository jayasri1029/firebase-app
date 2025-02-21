var app = angular.module("authApp", []);

app.controller("LoginController", function ($scope) {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyDL2AQHcAnIKyWOYrr7EFF7bKNUgDcRA8U",
        authDomain: "login-example-5d317.firebaseapp.com",
        projectId: "login-example-5d317",
        storageBucket: "login-example-5d317.appspot.com",
        messagingSenderId: "420133946976",
        appId: "1:420133946976:web:3ed1b67532c20ef8c86505"
    };

    firebase.initializeApp(firebaseConfig);
    var auth = firebase.auth();

    $scope.user = {};
    $scope.errorMessage = "";

    // Login function
    $scope.login = function () {
        auth.signInWithEmailAndPassword($scope.user.email, $scope.user.password)
            .then(function (userCredential) {
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect after login
            })
            .catch(function (error) {
                $scope.errorMessage = error.message;
                $scope.$apply();
            });
    };
});
