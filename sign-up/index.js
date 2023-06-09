// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZMJCk8212hSlGNFQoECawa6r7W2apZK0",
  authDomain: "pokedextracker-2ea0b.firebaseapp.com",
  databaseURL: "https://pokedextracker-2ea0b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokedextracker-2ea0b",
  storageBucket: "pokedextracker-2ea0b.appspot.com",
  messagingSenderId: "734591530122",
  appId: "1:734591530122:web:c3a6e3fb3c6e1fde51e973",
  measurementId: "G-2XR4X5KEL4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database()

function signup() {
  const uname = document.getElementById("username")
  const pw = document.getElementById("password")
  const cpw = document.getElementById("confirmpassword")
  const error = document.getElementById("error")
  error.innerText = ""
  if (uname.value.length > 0 && pw.value.length > 0 && cpw.value.length > 0) {
    if (pw.value == cpw.value) {
      //sign up pls
      error.innerText = "Signing up.."
      const unamee = btoa(uname.value);
      const pwe = btoa(pw.value);
      const token = `${unamee}/${pwe}`
      try {
        db.ref(`/users/${unamee}/`).once("value", function(snapshot) {
          const data = snapshot.val()
          try {
            if (data != null) {
              console.log("A")
              error.innerText = "An account with this username already exists!"
            } else {
              db.ref(`/users/${token}/`).set({
                username: uname.value,
                password: pw.value,
              }) .then(() => {
                localStorage.setItem("token", token)
                window.location.href = "../tracker/"
              })
            }
          } catch(e) {
            console.log(e)
            error.innerText = "There was an error signing up!"
          }
          
        })
      }
      catch(e) {
        console.log(e)
        error.innerText = "There was an error signing up!"
      }
    } else {
      error.innerText = "The two passwords to not match!"
    }
    
    
  } else {
    error.innerText = "You have not filled out the form!"
  }
}

addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    db.ref(`/users/${localStorage.getItem("token")}`).once("value", function(snapshot) {
      window.location.href = "../tracker/"
    })
  }
  document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
  document.getElementById("home").onclick = () => { window.location.href = "../" }
  document.getElementById("sign-in").onclick = () => { window.location.href = "../sign-in" }
})