import {
    auth,
    onAuthStateChanged,
    db,
    storage,
    doc,
    signOut,
    getDoc,
    getDocs,
    collection
} from './utils/utils.js'

// console.log("Auth =>", auth);
const logout_btn = document.getElementById('logout_btn');
const login_link = document.getElementById('login_link');
const user_img = document.getElementById("user_img");
const events_cards_containers = document.getElementById("events_cards");


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


getAllEvents();
function getUserInfo(uid) {

    const userRef = doc(db, "users", uid);
    getDoc(userRef).then((data) => {
        console.log("Data =>", data.id);
        console.log("Data =>", data.data());

        user_img.src = data.data().img
    })
}

async function getAllEvents() {
    try{

        const querySnapshot = await getDocs((collection(db, "events")));
        events_cards_containers.innerHTML = ""
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);

            const event = event.data();

            const {banner, title, description, location, date, time} = event;

            const cards = `<div id="event_cards_containers" class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
        <div class="relative">
            <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
            <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                <h2 class="text-2xl font-bold mb-2">${title}</h2>
                <p class="text-sm">${date} • ${time}</p>
            </div>
        </div>
        <div class="p-6">
            <!-- Text Area for Event Description -->
            <div class="mb-4">
                <textarea id="event-description" class="w-full h-24 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter event description here...">${description}</textarea>
            </div>
            <div class="flex flex-col text-gray-600 space-y-2">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                    <span>${location}</span>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                    <span>${date}</span>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"></path>
                    </svg>
                    <span>${time}</span>
                </div>
            </div>
        </div>
    </div>`


            events_cards_containers.innerHTML += cards; 

        });


    } catch (err) {
        
        alert(err);
    
    }
}