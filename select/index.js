import {games} from "./games.js"

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

const imgSize = 250

addEventListener("load", () => {
    document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
    document.getElementById("home").onclick = () => { window.location.href = "../" }
    db.ref(`/users/${localStorage.getItem("token")}`).once("value", function(snapshot) {
        var yes = false
        try {
            const data = snapshot.val()
            const username = data.username
            const usernameTxt = document.getElementById("user")
            usernameTxt.innerText = "Signed in as: "+username
            yes = true
        } catch {
            console.log("incorrect credentials!")
            document.getElementById("selectmenu").innerHTML = "incorrect credentials!"
        }
        
        if (yes) {
            Object.keys(games).forEach(gameID => {
                const game = games[gameID]
                const containment = document.createElement("div")
                containment.style = `background-color: lightgray; border-radius: 7px; width: ${imgSize}px; display: inline-block;`
                const imgCont = document.createElement("div")
                const img = document.createElement("img")
                img.src = `https://fpt-imgs.up.railway.app/game/${game.gamecode}.png`
                img.style = `border-radius: 5px; width: ${imgSize}px; height: ${imgSize}px;`
                const txtCont = document.createElement("div")
                txtCont.style = `background-color: grey; width: ${imgSize}px; border-radius: 5px; transform: translate(0px, -30px);`
                const h1 = document.createElement("h1")
                h1.style = "font-size: 30px;"
                h1.innerText = game.title
                const h3 = document.createElement("h3")
                var desc = game.description
                const charlimit = 65
                desc = desc.substring(0, charlimit)
                var a = false
                if (game.description.length > charlimit) {
                    desc = desc + "...\n(click to expand)"
                    h3.onclick = () => {
                        a = !a
                        if (a == true) {
                            h3.innerText = game.description
                        } else {
                            h3.innerText = desc
                        }
                    }
                }
                h3.innerText = desc
                const btn = document.createElement("button")
                btn.setAttribute("class", "buttonsmol")
                btn.style = "transform: translate(0px, -20px);"
                btn.innerText = "Go!"
                console.log(`../tracker/?game=${game.gamecode}`)
                btn.onclick = () => {
                    window.location.href = `../tracker/?game=${game.gamecode}`
                }
                imgCont.append(img)
                txtCont.append(h1)
                txtCont.append(h3)
                containment.append(imgCont)
                containment.append(txtCont)
                containment.append(btn)
                document.getElementById("selectmenu").append(containment)
            });
        }
    })
})