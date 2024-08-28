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

            const { banner, title, description, createdByEmail, location, date, time } = event;


            const cards = `<div id="events_cards_container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-gray-100">
        
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
          <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${title}</h3>
            <p class="text-gray-600 mb-4"${description}</p>
            <div class="text-sm text-gray-700 space-y-2">
              <p><strong>Email:</strong> ${createdByEmail}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
          </div>
        </div>
      
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
          <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${title}</h3>
            <p class="text-gray-600 mb-4">${description}</p>
            <div class="text-sm text-gray-700 space-y-2">
              <p><strong>Email:</strong> ${createdByEmail}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
          </div>
        </div>
      
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
          <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${title}</h3>
            <p class="text-gray-600 mb-4">${description}</p>
            <div class="text-sm text-gray-700 space-y-2">
              <p><strong>Email:</strong> ${createdByEmail}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
          </div>
        </div>
      
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
          <img src="${banner}" alt="Event Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-3 text-gray-800">${title}</h3>
            <p class="text-gray-600 mb-4">${description}</p>
            <div class="text-sm text-gray-700 space-y-2">
              <p><strong>Email:</strong> ${createdByEmail}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
            </div>
          </div>
        </div>
      </div>`

            events_cards_container.innerHTML += cards



        });
    } catch (err) {
        alert(err)
    }
}