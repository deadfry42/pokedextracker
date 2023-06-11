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

// things to add & do:
//  - hold ctrl and click on pkmn to bring to db info --- DONE
//  - go to top btn --- DONE
//  - add a search feature
//  - make pkmn icons in database match current settings --- DONE
//  - finish database
//  - add polish
//  - add pkmn box icons as a sprite option --- DONE

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database()

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

const adress = window.location.search
const params = new URLSearchParams(adress)

let save = params.get("save")
if (save == undefined || save == null || save == "") {save = ""} else {save="-"+save}

//content stuff
let game = params.get("game")
const supportedGames = [
    "pbrs",
    "gen3"
]
var found = false
supportedGames.forEach(sGame => {
    if (sGame == game) found = true
});

let gametitle = ""
if (game == "gen3") gametitle = "Pokemon Generation 3"
if (game == "pbrs") gametitle = "Pokemon Box: Ruby & Sapphire"

const url = "https://fpt-imgs.up.railway.app/"

const baseImgURL = `${url}icon/${game}` //https://fpt-imgs.up.railway.app/icon/pbrs/{vars.spritesNum}/{normal/frame2/animated}/{shiny/no}/{file}
const endURL = ""

const baseBoxURL = `${url}box/${game}` //https://fpt-imgs.up.railway.app/box/(body/head)/(standard/numbered head only)/{file}

//changable by user
let ctrl = false

//hard coded vars
let imgSize = 12
if (game == "gen3") imgSize = 6

let boxes = []
let pokemonData = {}
let settings = []
let vars = {}

import {obtainStatus, obtainMethod} from "./data/basedata.js"
import {gen3pokemonData} from "./data/gen3data.js"
import {pbrsboxes} from "./data/pbrsboxesdata.js"
import {gen3boxes} from "./data/gen3boxesdata.js"
import {pbrssettings, pbrsvars} from "./data/pbrssettingsdata.js"
import {gen3settings, gen3vars} from "./data/gen3settingsdata.js"

if (game == "pbrs") {
    boxes = pbrsboxes
    pokemonData = gen3pokemonData
    settings = pbrssettings
    vars = pbrsvars
}
if (game == "gen3") {
    boxes = gen3boxes
    pokemonData = gen3pokemonData
    settings = gen3settings
    vars = gen3vars
}
if (found == false) window.location.href = "../"



addEventListener("load", () => {
    // const scale = document.createElement("input")
    // scale.setAttribute("type", "range")
    // scale.setAttribute("min", 0)
    // scale.setAttribute("max", 1000)
    // document.getElementById("trackermenu").append(scale)

    // scale.onchange = () => {
    //     console.log(scale.value)
    //     const boxbgs = document.getElementsByClassName("boxcontainerg3")
    //     for (let box of boxbgs) {
    //         box.style.width = `${scale.value}px`
    //     }
    //     const pkmns = document.getElementsByClassName("pkmnimg")
    //     for (let pkmn of pkmns) {
    //         let boxE = document.getElementById("box1")
    //         pkmn.style = `object-fit: contain; opacity: 1; border-radius: 10px; width: ${boxE.clientWidth / imgSize}px; height: ${boxE.clientWidth / (imgSize+1)}px; user-select: none;`;
    //     }
    // }
    if (localStorage.getItem("token") == null) window.location.href = "../"
    const trackermenu = document.getElementById("trackermenu")
    const databasemenu = document.getElementById("databasemenu")
    const optionsmenu = document.getElementById("optionsmenu")
    const helpmenu = document.getElementById("helpmenu")
    const tracker = document.getElementById("tracker")
    const database = document.getElementById("database")
    const options = document.getElementById("options")
    const help = document.getElementById("help")
    try {
        Object.keys(settings).forEach((id) => {
            const setting = settings[id]
            db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${setting.dbname}`).on("value", function(snapshot) {
                const val = snapshot.val().value
                const optionDiv = document.getElementById(setting.dbname)
                const current = optionDiv.childNodes[1]
                const input = optionDiv.childNodes[2]
                try {setting.type.func(val, input, current)} catch(e) {console.log(e)}
            })
        })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${settings[0].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 0
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${settings[1].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 1
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${settings[2].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 2
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${settings[3].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 3
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}/settings/${settings[4].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 4
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
        // db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${settings[5].dbname}`).on("value", function(snapshot) {
        //     const val = snapshot.val().value
        //     const setting = 5
        //     const optionDiv = document.getElementById(settings[setting].dbname)
        //     const current = optionDiv.childNodes[1]
        //     const input = optionDiv.childNodes[2]
        //     try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        // })
    } catch(e) {
        console.log(e)
    }
    Object.keys(pokemonData).forEach((pkmnNum, i) => {
        try {
            const pkmnData = pokemonData[pkmnNum]
            if (pkmnData.database) {
                function getPkmnSummaryFromData(dta, endTxt) {
                    let methodSeperation = `<p class="blktxt smolbr">---</p>`
                    let rubyMsg = "";
                    let sapphireMsg = "";
                    let fireredMsg = "";
                    let leafgreenMsg = "";
                    let emeraldMsg = "";
                    let colosseumMsg = "";
                    let xdMsg = "";

                    let rubyA = dta.ruby;
                    let sapphireA = dta.sapphire;
                    let fireredA = dta.firered;
                    let leafgreenA = dta.leafgreen;
                    let emeraldA = dta.emerald;
                    let colosseumA = dta.colosseum;
                    let xdA = dta.xd;

                    const incomplete = {methods: [{status: obtainStatus.incomplete}]};

                    if (rubyA.methods == undefined) rubyA = incomplete
                    if (sapphireA.methods == undefined) sapphireA = incomplete
                    if (fireredA.methods == undefined) fireredA = incomplete
                    if (leafgreenA.methods == undefined) leafgreenA = incomplete
                    if (emeraldA.methods == undefined) emeraldA = incomplete
                    if (colosseumA.methods == undefined) colosseumA = incomplete
                    if (xdA.methods == undefined) xdA = incomplete

                    let extended;

                    if (rubyA == incomplete && sapphireA == incomplete && fireredA == incomplete && leafgreenA == incomplete && emeraldA == incomplete && colosseumA == incomplete && xdA == incomplete) {
                        extended = `<h6 class="bigtxt blktxt"><b class="headinglmao">${dta.name}</b><p class="smolbr"></p><p class="smolbr"></p>${obtainStatus.incomplete}</h6>`
                    } else {
                        rubyA.methods.forEach((method, i) => {
                            if (i > 0) rubyMsg = rubyMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                rubyMsg = rubyMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        rubyMsg = rubyMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        rubyMsg = rubyMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        rubyMsg = rubyMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        rubyMsg = rubyMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        rubyMsg = rubyMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        rubyMsg = rubyMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        rubyMsg = rubyMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        rubyMsg = rubyMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        rubyMsg = rubyMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        rubyMsg = rubyMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        rubyMsg = rubyMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                rubyMsg = method.status
                            }
                        })
                        sapphireA.methods.forEach((method, i) => {
                            if (i > 0) sapphireMsg = sapphireMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                sapphireMsg = sapphireMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        sapphireMsg = sapphireMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        sapphireMsg = sapphireMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        sapphireMsg = sapphireMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        sapphireMsg = sapphireMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        sapphireMsg = sapphireMsg + method.pkmnDepost+" Pokémon."
                                    break;
                                    case obtainMethod.evolve_level:
                                        sapphireMsg = sapphireMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        sapphireMsg = sapphireMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        sapphireMsg = sapphireMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        sapphireMsg = sapphireMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        sapphireMsg = sapphireMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        sapphireMsg = sapphireMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                sapphireMsg = method.status
                            }
                        })
                        fireredA.methods.forEach((method, i) => {
                            if (i > 0) fireredMsg = fireredMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                fireredMsg = fireredMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        fireredMsg = fireredMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        fireredMsg = fireredMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        fireredMsg = fireredMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        fireredMsg = fireredMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        fireredMsg = fireredMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        fireredMsg = fireredMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        fireredMsg = fireredMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        fireredMsg = fireredMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        fireredMsg = fireredMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        fireredMsg = fireredMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        fireredMsg = fireredMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                fireredMsg = method.status
                            }
                        })
                        leafgreenA.methods.forEach((method, i) => {
                            if (i > 0) leafgreenMsg = leafgreenMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                leafgreenMsg = leafgreenMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        leafgreenMsg = leafgreenMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        leafgreenMsg = leafgreenMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        leafgreenMsg = leafgreenMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        leafgreenMsg = leafgreenMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        leafgreenMsg = leafgreenMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        leafgreenMsg = leafgreenMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        leafgreenMsg = leafgreenMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        leafgreenMsg = leafgreenMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        leafgreenMsg = leafgreenMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        leafgreenMsg = leafgreenMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        leafgreenMsg = leafgreenMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                leafgreenMsg = method.status
                            }
                        })
                        emeraldA.methods.forEach((method, i) => {
                            if (i > 0) emeraldMsg = emeraldMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                emeraldMsg = emeraldMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        emeraldMsg = emeraldMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        emeraldMsg = emeraldMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        emeraldMsg = emeraldMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        emeraldMsg = emeraldMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        emeraldMsg = emeraldMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        emeraldMsg = emeraldMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        emeraldMsg = emeraldMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        emeraldMsg = emeraldMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        emeraldMsg = emeraldMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        emeraldMsg = emeraldMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        emeraldMsg = emeraldMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                emeraldMsg = method.status
                            }
                        })
                        colosseumA.methods.forEach((method, i) => {
                            if (i > 0) colosseumMsg = colosseumMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                colosseumMsg = colosseumMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        colosseumMsg = colosseumMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        colosseumMsg = colosseumMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        colosseumMsg = colosseumMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        colosseumMsg = colosseumMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        colosseumMsg = colosseumMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        colosseumMsg = colosseumMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        colosseumMsg = colosseumMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        colosseumMsg = colosseumMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        colosseumMsg = colosseumMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        colosseumMsg = colosseumMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        colosseumMsg = colosseumMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                colosseumMsg = method.status
                            }
                        })
                        xdA.methods.forEach((method, i) => {
                            if (i > 0) xdMsg = xdMsg + methodSeperation
                            if (method.status == obtainStatus.obtainable) {
                                xdMsg = xdMsg + method.method
                                switch (method.method) {
                                    case obtainMethod.catch:
                                        xdMsg = xdMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.snag:
                                        xdMsg = xdMsg + ".<br>Locations: "+method.locations.toString().split(",").join(", ")
                                    break;
                                    case obtainMethod.gift:
                                        xdMsg = xdMsg + ".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.gift_req:
                                        xdMsg = xdMsg + method.req+".<br>Location: "+method.location
                                    break;
                                    case obtainMethod.box_egg:
                                        xdMsg = xdMsg + method.pkmnDepost+" Pokémon"
                                    break;
                                    case obtainMethod.evolve_level:
                                        xdMsg = xdMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" at level "+method.level
                                    break;
                                    case obtainMethod.evolve_trade_item:
                                        xdMsg = xdMsg + method.item
                                    break;
                                    case obtainMethod.evolve_item:
                                        xdMsg = xdMsg + ".<br>Evolves from "+pokemonData[""+method.base].name+" by using "+method.item
                                    break;
                                    case obtainMethod.pomeg_location:
                                        xdMsg = xdMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.save_editing:
                                        xdMsg = xdMsg + `${method.ticket} to go to ${method.location}`
                                    break;
                                    case obtainMethod.purchased:
                                        xdMsg = xdMsg + method.location+" for "+method.amount+" "+method.currency
                                    break;
                                }  
                            } else {
                                xdMsg = method.status
                            }
                        })
                        var bundleRaS = false
                        var bundleFRaLG = false
                        var bundleCaXD = false
                        if (rubyMsg == sapphireMsg) bundleRaS = true
                        if (fireredMsg == leafgreenMsg) bundleFRaLG = true
                        if (colosseumMsg == xdMsg) bundleCaXD = true
                        var r = `<b class="rubytxt">Pokémon Ruby:</b> ${rubyMsg}`
                        var rs = `<b class="rubytxt">Pokémon Ruby</b> <b class="sapphiretxt">and Sapphire:</b> ${rubyMsg}`
                        var s = `<br><p class="smolbr"></p><b class="sapphiretxt">Pokémon Sapphire:</b> ${sapphireMsg}`
                        var fr = `<b class="frtxt">Pokémon FireRed:</b> ${fireredMsg}`
                        var frlg = `<b class="frtxt">Pokémon FireRed</b> <b class="lgtxt">and LeafGreen:</b> ${fireredMsg}`
                        var lg = `<br><p class="smolbr"></p><b class="lgtxt">Pokémon LeafGreen:</b> ${leafgreenMsg}`
                        var c = `<b class="colosseumtxt">Pokémon Colosseum:</b> ${colosseumMsg}`
                        var cxd = `<b class="colosseumtxt">Pokémon Colosseum</b> <b class="xdtxt">and XD:</b> ${colosseumMsg}`
                        var xd = `<br><p class="smolbr"></p><b class="xdtxt">Pokémon XD:</b> ${xdMsg}`
                        var ras;
                        var fralg;
                        var caxd;
                        if (bundleRaS) { ras = rs } else { ras = r+s }
                        if (bundleFRaLG) { fralg = frlg } else { fralg = fr+lg }
                        if (bundleCaXD) { caxd = cxd } else { caxd = c+xd }
                        extended = `<h6 class="bigtxt blktxt"><b class="headinglmao">${dta.name}</b><p class="smolbr"></p><p class="smolbr"></p>${ras}<br><p class="smolbr"></p>${fralg}<br><p class="smolbr"></p><b class="emeraldtxt">Pokémon Emerald:</b> ${emeraldMsg}<br><p class="smolbr"></p>${caxd}<br><p class="smolbr"><b id="eandc">${endTxt}</b></h6>`
                    }
                    return extended
                }
                const forms = pkmnData.forms
                if (forms) {
                    const extendedSummary = getPkmnSummaryFromData(pkmnData, "(Click to hide all forms)")
                    var collapsed = `<h6 class="bigtxt blktxt"><b class="headinglmao">${pkmnData.name}</b><p class="smolbr"></p><b id="eandc">(Click to see all forms)</b></h6>`
                    const box = document.createElement("div")
                    box.setAttribute("class", "boxdb")
                    const br = document.createElement("br")
                    const coexistance = document.createElement("div")
                    coexistance.setAttribute("class", "combineimgandtxtwoutcenter")
                    coexistance.setAttribute("id", `DbEntry${pkmnData.id}`)
                    coexistance.setAttribute("pkmnid", `${pkmnData.id}`)
                    const img = document.createElement("img")
                    img.setAttribute("class", "pkmnimgdb")
                    img.setAttribute("pkmnId", pkmnData.id)
                    img.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${pkmnData.id}.png${endURL}`
                    img.style = `width: 150px; height: 150px; float: left; cursor: auto;`
                    const txtdiv = document.createElement("div")
                    txtdiv.setAttribute("id", "txtdivfordbentry")
                    txtdiv.style = `float: left; cursor: auto;`
                    const p = document.createElement("p")
                    p.setAttribute("class", "innertxtindbe")
                    var iscollapsed = true
                    p.innerHTML = collapsed
                    p.style = `cursor: auto;`
                    box.append(br)
                    
                    txtdiv.append(p)
                    coexistance.append(img)
                    coexistance.append(txtdiv)
                    box.append(coexistance)
                    databasemenu.append(box)

                    let allFormInfos = []

                    forms.forEach(formid => {
                        const pkmnDataFromID = pokemonData[formid]
                        const extendedSummary = getPkmnSummaryFromData(pkmnDataFromID, "")
                        const coexistance2 = document.createElement("div")
                        coexistance2.setAttribute("class", "combineimgandtxtwoutcenter")
                        coexistance2.setAttribute("id", `DbEntry${pkmnDataFromID.id}`)
                        coexistance2.setAttribute("pkmnid", `${pkmnDataFromID.id}`)
                        const img2 = document.createElement("img")
                        img2.setAttribute("class", "pkmnimgdb")
                        img2.setAttribute("pkmnId", pkmnDataFromID.id)
                        img2.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${pkmnDataFromID.id}.png${endURL}`
                        img2.style = `width: 150px; height: 150px; float: left; cursor: auto;`
                        const txtdiv2 = document.createElement("div")
                        txtdiv2.setAttribute("id", "txtdivfordbentry")
                        txtdiv2.style = `float: left; cursor: auto;`
                        const p2 = document.createElement("p")
                        p2.setAttribute("class", "innertxtindbe")
                        p2.innerHTML = extendedSummary
                        p2.style = `cursor: auto;`
                        coexistance2.append(img2)
                        coexistance2.append(txtdiv2)
                        coexistance2.style.display = "none"
                        coexistance2.append(img2)
                        coexistance2.append(p2)
                        allFormInfos.push(coexistance2)
                        box.append(coexistance2)

                        p2.onclick = () => {
                            iscollapsed = !iscollapsed
                            if (iscollapsed) {
                                p.innerHTML = collapsed
                                allFormInfos.forEach(forminfo => {
                                    forminfo.style.display = "none"
                                });
                            }
                            if (!iscollapsed) {
                                p.innerHTML = extendedSummary
                                allFormInfos.forEach(forminfo => {
                                    forminfo.style.display = "block"
                                });
                            }
                        }
                    });

                    p.onclick = () => {
                        iscollapsed = !iscollapsed
                        if (iscollapsed) {
                            p.innerHTML = collapsed
                            allFormInfos.forEach(forminfo => {
                                forminfo.style.display = "none"
                            });
                        }
                        if (!iscollapsed) {
                            p.innerHTML = extendedSummary
                            allFormInfos.forEach(forminfo => {
                                forminfo.style.display = "block"
                            });
                        }
                    }

                    const br3 = document.createElement("br")
                    
                    
                    box.append(br3)
                    
                } else {
                    const extendedSummary = getPkmnSummaryFromData(pkmnData, "(Click to collapse)")
                    var collapsed = `<h6 class="bigtxt blktxt"><b class="headinglmao">${pkmnData.name}</b><p class="smolbr"></p><b id="eandc">(Click to expand)</b></h6>`
                    const box = document.createElement("div")
                    box.setAttribute("class", "boxdb")
                    const br = document.createElement("br")
                    const coexistance = document.createElement("div")
                    coexistance.setAttribute("class", "combineimgandtxtwoutcenter")
                    coexistance.setAttribute("id", `DbEntry${pkmnData.id}`)
                    coexistance.setAttribute("pkmnid", `${pkmnData.id}`)
                    const img = document.createElement("img")
                    img.setAttribute("class", "pkmnimgdb")
                    img.setAttribute("pkmnId", pkmnData.id)
                    img.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${pkmnData.id}.png${endURL}`
                    img.style = `width: 150px; height: 150px; float: left; cursor: auto;`
                    const txtdiv = document.createElement("div")
                    txtdiv.setAttribute("id", "txtdivfordbentry")
                    txtdiv.style = `float: left; cursor: auto;`
                    const p = document.createElement("p")
                    p.setAttribute("class", "innertxtindbe")
                    var iscollapsed = true
                    p.innerHTML = collapsed
                    p.style = `cursor: auto;`

                    p.onclick = () => {
                        iscollapsed = !iscollapsed
                        if (iscollapsed) p.innerHTML = collapsed
                        if (!iscollapsed) p.innerHTML = extendedSummary
                    }

                    const br3 = document.createElement("br")
                    box.append(br)
                    
                    txtdiv.append(p)
                    coexistance.append(img)
                    coexistance.append(txtdiv)
                    box.append(coexistance)
                    box.append(br3)
                    databasemenu.append(box)
                }
            }
            
        } catch(e) {
            console.log(e)
        }
    })
    const br = document.createElement("br")
    const br2 = document.createElement("br")
    databasemenu.append(br)
    databasemenu.append(br2)

    const infoDbIcon = document.createElement("img")
    infoDbIcon.src = "../other imgs/info.png"
    infoDbIcon.style.display = "none"
    infoDbIcon.style.width = "0px"
    infoDbIcon.style.height = "0px"

    const lowbtn = document.createElement("img")
    lowbtn.src = "../other imgs/up.png"
    lowbtn.style.display = "block"
    lowbtn.style = "display: none; position: fixed; width: 100px; height: 100px; top: 100px; left: 0;"
    lowbtn.setAttribute("id", "gotop")
    lowbtn.setAttribute("class", "hoverhandle")
    document.getElementById("centered").append(lowbtn)

    addEventListener("scroll", (e) => {
        if (window.scrollY > 4500) {
            lowbtn.style.display = "block"
            // lowbtn.style.top = `${(scrollY+window.innerHeight)-130}px`
            lowbtn.style.top = `${(window.innerHeight)-130}px`
            console.log("btn")
        } else {
            lowbtn.style.display = "none"
            console.log("btnGONE (vineboom)")
        }
    })

    document.onkeydown = (e) => {
        if (e.key == "Control" || e.key == "Meta" || e.key == "Alt") {
            ctrl = true
            infoDbIcon.style.display = "inline"
        }
    }
    
    document.onkeyup = (e) => {
        if (e.key == "Control" || e.key == "Meta" || e.key == "Alt") {
            ctrl = false
            infoDbIcon.style.display = "none"
        }
    }

    boxes.forEach((box, i) => {
        if (box[0].header == true) {
            const headerId = box[0].id
            const extraVal = box[0].extra
            const headerContainer = document.createElement("div")
            headerContainer.setAttribute("class", "boxcontainershort")
            headerContainer.setAttribute("id", `boxH${headerId}container`)
            const header = document.createElement("h1")
            header.innerText = box[0].boxName
            header.setAttribute("class", "pbrstitle")
            if (!extraVal) headerContainer.setAttribute("class", "boxcontainershort")
            if (extraVal) headerContainer.setAttribute("class", "boxcontainershort extrabox")
            if (game == "gen3") {
                if (!extraVal) headerContainer.setAttribute("class", "boxcontainerg3short")
                if (extraVal) headerContainer.setAttribute("class", "boxcontainerg3short extrabox")
            }
            headerContainer.append(header)
            document.getElementById("trackermenu").append(headerContainer)
        } else {
            const boxId = box[0].id
            const extraVal = box[0].extra
            const boxcontainer = document.createElement("div")
            if (!extraVal) boxcontainer.setAttribute("class", "boxcontainer")
            if (extraVal) boxcontainer.setAttribute("class", "boxcontainer extrabox")
            if (game == "gen3") if (!extraVal) boxcontainer.setAttribute("class", "boxcontainerg3")
            if (game == "gen3") if (extraVal) boxcontainer.setAttribute("class", "boxcontainerg3 extrabox")
            boxcontainer.setAttribute("id", `box${boxId}container`)

            const boxheadercontainer = document.createElement("div")
            boxheadercontainer.setAttribute("class", "headerthingy")
            
            const boxheader = document.createElement("img")
            boxheadercontainer.append(boxheader)
            if (game == "pbrs") {
                const numberedHeadings = settings[2].value
                if (numberedHeadings) boxheader.src = `${baseBoxURL}/header/numbered/box${boxId}.png`
                if (!numberedHeadings) boxheader.src = `${baseBoxURL}/header/standard/box${boxId}.png`
            } else if (game == "gen3") {
                boxheader.src = `${baseBoxURL}/header/rs/box${boxId}.png`
            }

            boxheader.setAttribute("class", "boxheader")
            if (game == "gen3") boxheader.setAttribute("class", "boxheaderg3")
            boxheader.setAttribute("id", `box${boxId}header`)
            boxheader.setAttribute("boxid", `${boxId}`)
            const boxE = document.createElement("div")
            boxE.setAttribute("class", "box")
            boxE.setAttribute("boxid", boxId)
            boxE.setAttribute("id", `box${boxId}`)
            if (game == "pbrs") {boxE.style = `background-image: url("${baseBoxURL}/body/standard/box${boxId}.png");`}
            if (game == "gen3") {boxE.style = `background-image: url("${baseBoxURL}/body/${vars.boxgame}/box${boxId}.png");`}
            const br = document.createElement("br")
            const br2 = document.createElement("br")
            boxcontainer.append(br)
            boxcontainer.append(boxheadercontainer)
            boxcontainer.append(boxE)
            boxcontainer.append(br2)
            boxcontainer.append(infoDbIcon)
            boxheadercontainer.style.content = box[0].boxName
            document.getElementById("trackermenu").append(boxcontainer)
            if (game == "gen3") {
                const eText = document.createElement("h1")
                eText.setAttribute("class", "pbrstitle boxheadertitletext")
                eText.setAttribute("boxid", i)
                eText.style = `position: absolute; top: ${(boxheader.getBoundingClientRect().top-(boxheader.getBoundingClientRect().height/2))+window.scrollY}px; left: ${(boxheader.getBoundingClientRect().left+(boxheader.getBoundingClientRect().width/3.2))}px;`
                boxheader.onload = () => {
                    eText.style = `position: absolute; top: ${(boxheader.getBoundingClientRect().top-(boxheader.getBoundingClientRect().height/2))+window.scrollY}px; left: ${(boxheader.getBoundingClientRect().left+(boxheader.getBoundingClientRect().width/3.2))}px;`
                }
                if (vars.numberedHeadings) eText.innerText = box[0].altboxName
                if (!vars.numberedHeadings)  eText.innerText = box[0].boxName
                boxheadercontainer.append(eText)
            }
            box.forEach(pokemon => {
                if (pokemon == null) pokemon = pokemonData[0]
                if (pokemon.name != "getinfo") {
                    const pkmnDiv = document.createElement("div")
                    pkmnDiv.style = `display: inline; position: relative; text-align: center; object-fit: contain; user-select: none;`
                    pkmnDiv.setAttribute("class", "pokemonDiv")
                    pkmnDiv.setAttribute("id", "pkmn"+pokemon.id)
                    const pkmnImg = document.createElement("img")
                    pkmnImg.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${pokemon.id}.png${endURL}`
                    pkmnImg.setAttribute("id", "pkmnimg"+pokemon.id)
                    pkmnImg.setAttribute("pkmnid", pokemon.id)
                    pkmnImg.setAttribute("class", "pkmnimg")
                    pkmnImg.style = `object-fit: contain; opacity: 1; border-radius: 10px; width: ${boxE.clientWidth / imgSize}px; height: ${boxE.clientWidth / (imgSize+1)}px; user-select: none;`;
                    if (game == "pbrs") pkmnImg.style.height = `${boxE.clientWidth / (imgSize+1.39)}px`
                    const pkmnSubtitleDiv = document.createElement("div")
                    pkmnSubtitleDiv.style = `text-align:center; position: absolute; top:-100%; right:50%; transform:translate(50%, -50%); background-color: rgba(255, 255, 255, 0.2); border-radius: 15px; height: 1vw; user-select: none; display:none;`
                    const pkmnSubtitle = document.createElement("p")
                    pkmnSubtitle.innerText = pokemon.name
                    pkmnSubtitle.style = `position: relative; top: -10px; width: 75px;user-select: none;`
                    pkmnSubtitle.setAttribute("class", "pkmnSubtitle")
                    pkmnSubtitleDiv.append(pkmnSubtitle)
                    pkmnDiv.append(pkmnImg)
                    pkmnDiv.append(pkmnSubtitleDiv)
                    boxE.append(pkmnDiv)
                    if (pokemon.id != 0) {
                        pkmnImg.style.opacity = 0.4
                        if (vars.darkenWhenUnobtained) pkmnImg.style.filter = "brightness(30%)"
                        pkmnDiv.style.cursor = "pointer"
                        let obtained = false
                        pkmnDiv.onmouseenter = () => {
                            //fade into something
                            pkmnSubtitleDiv.style.display = "block"
                            infoDbIcon.style.pointerEvents = "none"
                            infoDbIcon.style.opacity = 0.4
                            infoDbIcon.style.width = `${pkmnImg.style.width}`
                            infoDbIcon.style.height = `${pkmnImg.style.height}`
                            const top = pkmnImg.getBoundingClientRect().top+window.scrollY; const left = pkmnImg.getBoundingClientRect().left+window.scrollX;
                            infoDbIcon.style.top = `${top}px`
                            infoDbIcon.style.left = `${left}px`
                            infoDbIcon.style.position = "absolute"
                            if (vars.sprites == 2) {
                                if (vars.emeraldAnimation == 2) {
                                    pkmnImg.src = `${baseImgURL}/${vars.sprites}/animated/${vars.shiny}/${pokemon.id}.gif${endURL}`
                                    pkmnImg.style.scale = 1.5
                                } else if (vars.emeraldAnimation == 1) {
                                    pkmnImg.src = `${baseImgURL}/${vars.sprites}/frame2/${vars.shiny}/${pokemon.id}.png${endURL}`
                                    pkmnImg.style.scale = 1
                                }
                            }
                        }

                        pkmnDiv.onmouseleave = () => {
                            //fade out lmao
                            pkmnSubtitleDiv.style.display = "none"
                            if (vars.emeraldAnimation != 4 && vars.emeraldAnimation != 3) {
                                pkmnImg.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${pokemon.id}.png${endURL}`
                                pkmnImg.style.scale = 1
                            }
                        }

                        pkmnDiv.onmouseup = () => {
                            if (ctrl) {
                                const dbEntry = document.getElementById(`DbEntry${pokemon.id}`)
                                if (dbEntry) {
                                    const offset = 400
                                    databaseMenu()
                                    if (dbEntry.offsetTop <= 0) {
                                        //must be form, db entry cannot be > 0
                                        const parentId = pokemon.id.split("-")[0]
                                        const parentdB = document.getElementById(`DbEntry${parentId}`)
                                        let y = (parentdB.getBoundingClientRect().top-offset)+window.scrollY
                                        window.scrollTo(0, y)
                                    } else {
                                        let y = (dbEntry.getBoundingClientRect().top-offset)+window.scrollY
                                        window.scrollTo(0, y)
                                    }
                                    
                                } else {
                                    console.log("No DB Entry!")
                                }
                            } else {
                                try {
                                    db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/pkmn/${pokemon.id}`).once("value", function(snapshot) {
                                        try {
                                            const data = snapshot.val()
                                            const obtained = data["obtained"]
                                            db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/pkmn/${pokemon.id}`).set({
                                                id: pokemon.id,
                                                obtained: !obtained,
                                            })
                                        } catch(e) {
                                            try {
                                                db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/pkmn/${pokemon.id}`).set({
                                                    id: pokemon.id,
                                                    obtained: true,
                                                })
                                            } catch(e) {
                                                console.log(e)
                                            }
                                        }
                                        
                                    })
                                } catch(e) {
                                    console.log(e)
                                }
                            }
                            
                        }
                    }
                }
            })
        }
    });
    document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
    document.getElementById("home").onclick = () => { window.location.href = "../" }
    document.getElementById("gotop").onclick = () => { window.scrollTo(window.scrollY, 0) }
    document.getElementById("reftxt").onclick = () => { window.location.href = `./?game=${game}&save=${save.substring(1,save.length)}` }
    document.getElementById("lyras").onclick = () => { window.location.href = "http://i-made-a.website" }
    document.getElementById("bulba").onclick = () => { window.location.href = "https://bulbapedia.bulbagarden.net/wiki/Main_Page" }
    document.getElementById("sereb").onclick = () => { window.location.href = "https://www.serebii.net" }
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").style.display = "inline"
    document.getElementById("databasemenu").style.display = "none"
    document.getElementById("optionsmenu").style.display = "none"
    document.getElementById("helpmenu").style.display = "none"
    document.getElementById("notutd").style.display = "block"
    document.getElementById("tracker").style.textDecoration = "underline"
    document.getElementById("gametitle").innerText = `(${gametitle})`
    db.ref(`/users/${localStorage.getItem("token")}`).once("value", function(snapshot) {
        const data = snapshot.val()
        const username = data.username
        const usernameTxt = document.getElementById("user")
        usernameTxt.innerText = "Signed in as: "+username
    })
    db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/pkmn/`).on("value", function(snapshot) {
        const data = snapshot.val()
        let array;
        try {array = Object.keys(data)} catch(e) {array=0;console.log(e)}
        try {
            array.forEach(pkmnId => {
                const pkmn = data[pkmnId]
                const id = pkmn.id
                const bool = pkmn.obtained
                const pkmnElement = document.getElementById("pkmnimg"+id)
                if (pkmnElement) {
                    if (id) {
                        if (bool == true) {
                            pkmnElement.style.opacity = 1
                            if (vars.darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (!vars.darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (vars.emeraldAnimation == 3 && vars.sprites == 2) {
                                pkmnElement.style.scale == 1.5
                                pkmnElement.src = `${baseImgURL}/${vars.sprites}/animated/${vars.shiny}/${id}.gif${endURL}`
                                
                            }
                        } else {
                            pkmnElement.style.opacity = 0.4
                            if (vars.darkenWhenUnobtained) pkmnElement.style.filter = "brightness(30%)"
                            if (!vars.darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (vars.emeraldAnimation == 3 && vars.sprites == 2) {
                                pkmnElement.style.scale == 1
                                pkmnElement.src = `${baseImgURL}/${vars.sprites}/normal/${vars.shiny}/${id}.png${endURL}`
                            }
                        }
                        
                    }
                }
            });
        } catch(e) {
            console.log(e)
        }
        document.getElementById("loading").style.display = "none"
    })

    settings.forEach((setting, i) => {
        const name = setting.name
        const type = setting.type.type
        const rvar = setting.var
        if (type == "linear") {
            const options = setting.type.options
            const element = document.createElement("input")
            element.setAttribute("type", "range")
            element.setAttribute("step", 1)
            element.setAttribute("min", 0)
            element.setAttribute("value", rvar || 0)
            element.setAttribute("max", options.length-1)
            const label = document.createElement("h2")
            label.innerText = name
            const currentoption = document.createElement("h4")
            currentoption.setAttribute("id", "current")
            currentoption.innerText = options[element.value].name
            const optionDiv = document.createElement("div")
            optionDiv.setAttribute("id", setting.dbname)
            optionDiv.append(label)
            optionDiv.append(currentoption)
            optionDiv.append(element)
            optionsmenu.append(optionDiv)
            element.onchange = () => {
                setting["value"] = element.value
                const dbname = setting.dbname
                db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${dbname}`).set({
                    value: element.value
                })
            }
        } else if (type == "boolean") {
            const element = document.createElement("input")
            element.setAttribute("type", "checkbox")
            element.setAttribute("checked", rvar || false)
            const label = document.createElement("h2")
            label.innerText = name
            const currentoption = document.createElement("h4")
            currentoption.setAttribute("id", "current")
            currentoption.innerText = element.value
            const optionDiv = document.createElement("div")
            optionDiv.setAttribute("id", setting.dbname)
            optionDiv.append(label)
            optionDiv.append(currentoption)
            optionDiv.append(element)
            optionsmenu.append(optionDiv)
            element.onchange = () => {
                setting["value"] = element.checked
                const dbname = setting.dbname
                db.ref(`/users/${localStorage.getItem("token")}/${game}${save}/settings/${dbname}`).set({
                    value: element.checked
                })
            }
        }
    });
    const br3 = document.createElement("br")
    optionsmenu.append(br3)

    function trackerMenu() {
        trackermenu.style.display = "inline"
        databasemenu.style.display = "none"
        optionsmenu.style.display = "none"
        helpmenu.style.display = "none"
        tracker.style.textDecoration = "underline"
        database.style.textDecoration = "none"
        options.style.textDecoration = "none"
        help.style.textDecoration = "none"
    }
    function databaseMenu() {
        trackermenu.style.display = "none"
        databasemenu.style.display = "inline"
        optionsmenu.style.display = "none"
        helpmenu.style.display = "none"
        tracker.style.textDecoration = "none"
        database.style.textDecoration = "underline"
        options.style.textDecoration = "none"
        help.style.textDecoration = "none"
    }
    function optionsMenu() {
        trackermenu.style.display = "none"
        databasemenu.style.display = "none"
        optionsmenu.style.display = "inline"
        helpmenu.style.display = "none"
        tracker.style.textDecoration = "none"
        database.style.textDecoration = "none"
        options.style.textDecoration = "underline"
        help.style.textDecoration = "none"
    }
    function helpMenu() {
        trackermenu.style.display = "none"
        databasemenu.style.display = "none"
        optionsmenu.style.display = "none"
        helpmenu.style.display = "inline"
        tracker.style.textDecoration = "none"
        database.style.textDecoration = "none"
        options.style.textDecoration = "none"
        help.style.textDecoration = "underline"
    }

    tracker.onclick = trackerMenu
    database.onclick = databaseMenu
    options.onclick = optionsMenu
    help.onclick = helpMenu

    document.getElementById("helpmenuinner").innerHTML = `<h1>How to use</h1><h3>Now, if you clicked on this tab out of pure necessity, I will first explain the basics.<br>This website is designed to be a pokedex tracker for ${gametitle}.<br>You can click on the different pokemon images to mark them as "obtained" and click on them again to unmark them. The "marking" is shown as the pokemon being slightly translucent (and darker if you have a specific setting enabled).<br>This website is supposed to be the one website you need to start and eventually finish (hopefully) your living dex, with information on where to find the pokemon being readily available in the Pokemon Database tab.</h3><br><h1>Extra controls</h1><h3>There are some hidden controls, but as of now, there is only one. By holding (windows/linux: CTRL/ALT, mac: CTRL/Option/Command), you can then press on a specific pokemon and it will take you to the database entry of that pokemon. Unfortunately, there is no way to do this on mobile. You can do this on different forms, but it will only bring you to the database entry of the base form.</h3><br><br<`
})