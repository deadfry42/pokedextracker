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

let decodedUname = false

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database()

function signout() {
  localStorage.removeItem("token")
  window.location.href = "../sign-in/"
}

function signin() {
  const error = document.getElementById("error")
  error.innerText = ""
  if (decodedUname) {
    window.location.href = "../tracker/"
  } else {
    error.innerText = "There was an error signing in! Try signing out and back in if the issue persists."
  }
}

addEventListener("load", () => {
  document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
  document.getElementById("home").onclick = () => { window.location.href = "../" }
  const token = localStorage.getItem("token")
  const halves = token.split("/")
  const uname = halves[1]
  const unamedecode = atob(uname)
  const element = document.getElementById("unamedecode")
  db.ref(`users/${token}`).once("value", function(snapshot) {
    const data = snapshot.val()
    if (data != null) {
      decodedUname = true
      element.innerHTML = `<h1 id="unamedecode">${unamedecode}?</h1>`
    } else {
      decodedUname = false
      const deletedquestion = document.getElementById("lebottometexte")
      deletedquestion.innerText = "This account may have been deleted."
    }
  })
})