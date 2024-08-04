import {
    auth,
    signInWithEmailAndPassword
} from "../../utils/utils.js"


const login_form = document.getElementById("login_form");
// const login_btn = document.getElementById("login_btn");

// login_form.addEventListener("submit", function (e) {
//     e.preventDefault()

//     const email = e.target[1].value;
//     const password = e.target[2].value;

//     console.log("Email =>", email);
//     console.log("Password =>", password);


//     signInWithEmailAndPassword(auth, email, password).then(() => {
//         window.location.href = "/";

//         //email.value = ""
//         //password.value = ""
//     })
//         .catch((error) => {
//             alert(error);
//         })
// });


login_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }


    login_form.value = "";

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            // Check the error code
            if (error.code === 'auth/invalid-email') {
                alert('Invalid email format.');
            } else if (error.code === 'auth/user-not-found') {
                alert('No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            } else {
                alert(`Login failed: ${error.message}`);
            }
        });
});

