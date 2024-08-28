import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc, //Collection ref leke data genrate krta hai or id bh khud genrate krta hai.
} from "../utils/utils.js"


const event_form = document.getElementById("event_form");


event_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);

    const eventInfo = {
        banner: e.target[0].files[0],
        title: e.target[1].value,
        description: e.target[2].value,
        createdByEmail: e.target[3].value,
        location: e.target[4].value,
        date: e.target[5].value,
        time: e.target[6].value,
    }

    console.log("eventInfo =>", eventInfo);

    const imgRef = ref(storage, eventInfo.banner.name)

    uploadBytes(imgRef, eventInfo.banner)

        .then(() => {

            console.log("File Uplaod Done");

            getDownloadURL(imgRef).then((url) => {

                console.log("Got URL", url);

                eventInfo.banner = url;

                const eventCollection = collection(db, "events")

                addDoc(eventCollection, eventInfo)

                    .then(() => {

                        console.log("Document Added");

                        window.location.href = "/";

                    })

            })

        })

});