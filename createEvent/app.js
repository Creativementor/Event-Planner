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
    //console.log(e.target);

    const eventInfo = {
        banner: e.target[0].files[0],
        title: e.target[1].value,
        description: e.target[2].value,
        location: e.target[3].value,
        date: e.target[4].value,
        time: e.target[5].value,
    }


    console.log(eventInfo);


    const imgRef = ref(storage, eventInfo.banner.name); //yahn hum event ka naam or file ka naam denge 
    uploadBytes(imgRef, eventInfo.banner).then(() => {
        console.log("File Upload has been Done");


        getDownloadURL(imgRef)


            .then((url) => {

                console.log("Got URL", url);

                eventInfo.banner = url;


                //add documents to events collections

                const eventCollections = collection(db, "events")

                addDoc(eventCollections, eventInfo)

                    .then((snapshot) => {
                       
                        console.log("Document Added");

                        window.location.href = "/";
                    })
            })


    })
});