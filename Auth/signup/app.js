import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
    storage, 
    ref,
    uploadBytes,
    getDownloadURL
} from "../../utils/utils.js"



//1.Create Account => createUserWithEmailAndPassword
//2. Upload Image => ref , UploadBytes , getDownloadURL       
//3.Set Complete Data into Firestore => doc , setDoc

const signup_form = document.getElementById("signup_form");


signup_form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e);
    console.log(e.target);


    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;

    const userInfo = {
        img,
        email,
        password,
        firstName,
        lastName,
        phone,
        company,
    }

    signup_form.value = ""

    signup_user_btn.disabled = false;
    signup_user_btn.innerText = "Loading.....";
    createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("user=>", user.user.uid);
      // upload user image
      const userRef = ref(storage, `${user.user.uid}`);
      uploadBytes(userRef, img)
        .then(() => {
          console.log("user image uploaded");
          // getting url of the image we just uploaded
          getDownloadURL(userRef)
            .then((url) => {
              console.log("url agya bhai=>", url);

              // update user info object
              userInfo.img = url;

              // created user document reference
              const userDbRef = doc(db, "users", user.user.uid);

              // set this document to db
              setDoc(userDbRef, userInfo).then(() => {
                console.log("User Object Updated into DB");
                window.location.href = "/";
                signup_user_btn.disabled = false;
                signup_user_btn.innerText = "Sign up";
              });
            })
            .catch((err) => {
              console.log("url firebase nahn de raha");
              signup_user_btn.disabled = false;
              signup_user_btn.innerText = "Sign up";
            });
        })
        .catch(() => {
          console.log("Error in uploading user image");
          signup_user_btn.disabled = false;
          signup_user_btn.innerText = "Sign up";
        });
    })
    .catch((err) => {
      alert(err), (signup_user_btn.disabled = false);
      signup_user_btn.innerText = "Sign up";
    });

  console.log(userInfo);

});