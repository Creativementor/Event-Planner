import {
    auth,
    onAuthStateChanged,
    db,
    storage,
    doc,
    signOut,
    getDoc,
    getDocs,
    collection,
} from './utils/utils.js'

// console.log("Auth =>", auth);

const logout_btn = document.getElementById('logout_btn');
const login_link = document.getElementById('login_link');
const user_img = document.getElementById("user_img");
const events_cards_container = document.getElementById("events_cards_container")


getAllEvents();
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

        user_img.src = data.data().img;
    });
}

async function getAllEvents() {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        events_cards_container.innerHTML = ''
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);

            const event = doc.data();
            console.log(event);

            const { banner, title, description, createdByEmail, location, date, time} = event;


            const cards = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div id="events_cards_container" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
            <img class="rounded-t-lg" src="${banner}" alt="Event Image">
            <div class="p-4">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${title}</h5>
                <p class="mb-3 font-normal text-gray-700">${description}</p>
                <hr class="my-2 border-gray-300">
                <p class="mb-3 font-normal text-gray-700"><strong>Email:</strong> ${createdByEmail}</p>
                <hr class="my-2 border-gray-300">
                <p class="mb-3 font-normal text-gray-700"><strong>Location:</strong> ${location}</p>
                <hr class="my-2 border-gray-300">
                <p class="mb-3 font-normal text-gray-700"><strong>Date:</strong> ${date}</p>
                <hr class="my-2 border-gray-300">
                <p class="mb-3 font-normal text-gray-700"><strong>Time:</strong> ${time}</p>
            </div>
     </div>
    </div>`

    events_cards_container.innerHTML += cards 

    console.log(event);
    

        });
    } catch (err) {
        alert(err)
    }
}