var app = angular.module("mainApp", ["ngRoute"]);

// Configure Routes
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "home.html" })
        .when("/todo", { templateUrl: "todo.html", controller: "TodoController" })
        .when("/users", { templateUrl: "users.html", controller: "UserController" })
        .when("/login", { templateUrl: "login.html", controller: "LoginController" })
        .when("/crud", { templateUrl: "crud.html", controller: "UserController" })
        .otherwise({ redirectTo: "/" });
});

// User Service to Handle Data
app.service("UserService", function ($http, $q) {
    var users = [];

    // Fetch users from API or local storage
    this.fetchUsers = function () {
        var savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            users = JSON.parse(savedUsers);
            console.log("Loaded from localStorage:", users);
            return $q.resolve(users);
        } else {
            return $http.get("https://jsonplaceholder.typicode.com/users")
                .then(function (response) {
                    users = response.data;
                    localStorage.setItem("users", JSON.stringify(users));
                    console.log("Fetched from API:", users);
                    return users;
                })
                .catch(function (error) {
                    console.error("Error fetching users:", error);
                    return $q.reject(error);
                });
        }
    };

    this.getUsers = function () {
        return users;
    };

    this.addUser = function (user) {
        user.id = users.length + 1;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        return $q.resolve(users);
    };

    this.updateUser = function (user) {
        var index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem("users", JSON.stringify(users));
        }
        return $q.resolve(users);
    };

    this.removeUser = function (id) {
        users = users.filter((u) => u.id !== id);
        localStorage.setItem("users", JSON.stringify(users));
        return $q.resolve(users);
    };
});

// User Controller (Manages Users)
app.controller("UserController", function ($scope, UserService) {
    $scope.users = [];
    $scope.newUser = {};

    UserService.fetchUsers().then(function (data) {
        $scope.users = data;
        $scope.$apply(); 
    }).catch(function (error) {
        console.error("Failed to load users:", error);
    });

    $scope.addUser = function () {
        if ($scope.newUser.name && $scope.newUser.email) {
            let newUser = { name: $scope.newUser.name, email: $scope.newUser.email };
            UserService.addUser(newUser).then(function (data) {
                $scope.users = data;
                $scope.newUser = {};
                $scope.$apply();
            });
        }
    };

    $scope.editUser = function (user) {
        user.editing = true;
    };

    $scope.saveUser = function (user) {
        user.editing = false;
        UserService.updateUser(user).then(function (data) {
            $scope.users = data;
            $scope.$apply();
        });
    };

    $scope.removeUser = function (id) {
        UserService.removeUser(id).then(function (data) {
            $scope.users = data;
            $scope.$apply();
        });
    };
});

// Todo Controller
app.controller("TodoController", function ($scope) {
    $scope.tasks = [];
    
    $scope.addTask = function () {
        if ($scope.newTask) {
            $scope.tasks.push({ name: $scope.newTask, done: false });
            $scope.newTask = "";
        }
    };

    $scope.toggleTask = function (task) {
        // No need to explicitly toggle since checkbox binding handles it
        console.log(`Task "${task.name}" marked as`, task.done ? "Completed" : "Pending");
    };

    $scope.deleteTask = function (index) {
        $scope.tasks.splice(index, 1);
    };
});


// Login Controller
app.controller("LoginController", function ($scope) {
    $scope.user = {};

    $scope.login = function () {
        alert("Login functionality will be implemented!");
    };
});
