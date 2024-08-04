import {
    auth,
    onAuthStateChanged,
    db,
    storage,
    doc,
    signOut,
    getDoc
} from './utils/utils.js'

// console.log("Auth =>", auth);
const logout_btn = document.getElementById('logout_btn');
const login_link = document.getElementById('login_link');
const user_img = document.getElementById("user_img")


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('User ID', user.uid);

        login_link.style.display = "none";
        user_img.style.display = "inline-block";

        getUserInfo(uid);

    } else {
        window.location.href = "/auth/login/index.html"
        login_link.style.display = "inline-block";
        user_img.style.display = "none";
    }
});


logout_btn.addEventListener("click", () => {
    signOut(auth);
});

function getUserInfo(uid) {
    
    const userRef = doc(db, "users", uid);
    getDoc(userRef).then((data) => {
        console.log("Data =>", data.id);
        console.log("Data =>", data.data());
    
        user_img.src = data.data().img
    })
}