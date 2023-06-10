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
//  - add a search feature
//  - make pkmn icons in database match current settings
//  - finish databse
//  - add polish
//  - add pkmn box icons as a sprite option --- DONE
//  - maybe add some more settings

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database()

const url = "https://fpt-imgs.up.railway.app/"

const baseImgURL = `${url}icon/pbrs` //https://fpt-imgs.up.railway.app/icon/pbrs/{spritesNum}/{normal/frame2/animated}/{shiny/no}/{file}
const endURL = ""

const baseBoxURL = `${url}box/pbrs` //https://fpt-imgs.up.railway.app/box/(body/head)/(standard/numbered head only)/{file}

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

//content stuff
let game = "pbrs"

//settings
let sprites = 3
let emeraldAnimation = 0
let numberedHeadings = true
let shiny = "no"
let darkenWhenUnobtained = true
let extras = false

let refreshC1 = 0
let refreshC2 = 0
let refreshC3 = 0

const settings = [
    {
        name: "Gen 3 Sprite Type",
        dbname: "sprites",
        desc: "Changes the type of sprite shown on the Pokédex Tracker & Pokémon Database pages. Note: Pokémon Database images do not animate.",
        var: sprites,
        type: {
            type: "linear",
            options: [
                {name: "Ruby & Sapphire", short: "RS"},
                {name: "FireRed & LeafGreen", short: "FRLG"},
                {name: "Emerald", short: "E"},
                {name: "Box Icons (Incompatible with shinyness)", short: "I"},
            ],
            func: function (val, input, current) {
                sprites = val
                input.value = val
                current.innerText = this.options[val].name
                if (val == 2 && emeraldAnimation == 4) {
                    const dbicons = document.getElementsByClassName("pkmnimgdb")
                    for (let element of dbicons) {
                        const id = element.getAttribute("pkmnId")
                        element.src = `${baseImgURL}/${val}/animated/${shiny}/${id}.gif${endURL}`
                    };
                    const names = document.getElementsByClassName("pkmnimg")
                    for (let element of names) {
                        const id = element.getAttribute("pkmnId")
                        element.src = `${baseImgURL}/${val}/animated/${shiny}/${id}.gif${endURL}`
                        element.style.scale = 1.5
                    };
                } else if (val == 2 && emeraldAnimation == 3) {
                    const names = document.getElementsByClassName("pkmnimg")
                    const dbicons = document.getElementsByClassName("pkmnimgdb")
                    for (let element of dbicons) {
                        const id = element.getAttribute("pkmnId")
                        element.src = `${baseImgURL}/${val}/normal/${shiny}/${id}.png${endURL}`
                    };
                    for (let element of names) {
                        const id = element.getAttribute("pkmnId")
                        if (element.style.opacity == 1) {
                            element.src = `${baseImgURL}/${val}/animated/${shiny}/${id}.gif${endURL}`
                            element.style.scale = 1.5
                        } else {
                            element.src = `${baseImgURL}/${val}/normal/${shiny}/${id}.png${endURL}`
                            element.style.scale = 1
                        }
                    };
                } else {
                    const dbicons = document.getElementsByClassName("pkmnimgdb")
                    for (let element of dbicons) {
                        const id = element.getAttribute("pkmnId")
                        element.src = `${baseImgURL}/${val}/normal/${shiny}/${id}.png${endURL}`
                    };
                    const names = document.getElementsByClassName("pkmnimg")
                    for (let element of names) {
                        const id = element.getAttribute("pkmnId")
                        element.src = `${baseImgURL}/${val}/normal/${shiny}/${id}.png${endURL}`
                        element.style.scale = 1
                    };
                }
                
            }
        },
    },
    {
        name: "Emerald animations",
        dbname: "eAnim",
        desc: "Changes the way the sprites (when in the 'Emerald' option) animate. Note: Pokémon Database images do not animate.",
        var: emeraldAnimation,
        type: {
            type: "linear",
            options: [
                {name: "Unanimated", short: "No"},
                {name: "Change frame on hover", short: "Frame"},
                {name: "Animate on hover", short: "Hover"},
                {name: "Constantly animating when obtained (Unstable)", short: "Selection"},
                {name: "Constantly animating (Unstable)", short: "Always"},
            ],
            func: function (val, input, current) {
                if (refreshC1 != 0) {document.getElementById("refpls").style.display = "block"} else {refreshC1 = 1}
                emeraldAnimation = val
                input.value = val
                current.innerText = this.options[val].name
                if (shiny == "no") {
                    if (val == 4 && sprites == 2) {
                        const names = document.getElementsByClassName("pkmnimg")
                        for (let element of names) {
                            const id = element.getAttribute("pkmnId")
                            element.src = `${baseImgURL}/${sprites}/animated/${shiny}/${id}.gif${endURL}`
                            element.style.scale = 1.5
                        };
                    } if (val == 3 && sprites == 2) {
                        const names = document.getElementsByClassName("pkmnimg")
                        for (let element of names) {
                            const id = element.getAttribute("pkmnId")
                            if (element.style.opacity == 1) {
                                element.src = `${baseImgURL}/${sprites}/animated/${shiny}/${id}.gif${endURL}`
                                element.style.scale = 1.5
                            } else {
                                element.src = `${baseImgURL}/${sprites}/normal/${shiny}/${id}.png${endURL}`
                                element.style.scale = 1
                            }
                        };
                    } else {
                        const names = document.getElementsByClassName("pkmnimg")
                        for (let element of names) {
                            const id = element.getAttribute("pkmnId")
                            element.src = `${baseImgURL}/${sprites}/normal/${shiny}/${id}.png${endURL}`
                            element.style.scale = 1
                        };
                    }
                }
            }
        },
    },
    {
        name: "Numbered headings",
        dbname: "numHead",
        desc: "Changes what the box headers say. If true, an example would be (1-60). If false, an example would be (BOX 1)",
        value: true,
        var: numberedHeadings,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                numberedHeadings = val
                input.checked = val
                current.innerText = val
                const names = document.getElementsByClassName("boxheader")
                for (let element of names) {
                    
                    const id = element.getAttribute("boxid")
                    if (val) element.src = `${baseBoxURL}/header/numbered/box${id}.png`
                    if (!val) element.src = `${baseBoxURL}/header/standard/box${id}.png`
                };
            }
        },
    },
    {
        name: "Shiny pokémon",
        dbname: "isshiny",
        desc: "Changes if the Pokémon shown in the Pokédex Tracker & Pokémon Database pages are shiny or not. Note: Incompatible with box sprites.",
        value: false,
        var: shiny,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                if (refreshC2 != 0) {document.getElementById("refpls").style.display = "block"} else {refreshC2 = 1}
                if (val) shiny = "shiny"
                if (!val) shiny = "no"
                input.checked = val
                current.innerText = val
            }
        },
    },
    {
        name: "Boxes with extra content",
        dbname: "extraboxes",
        desc: "Changes if there are any extra boxes that may contain different forms of a Pokemon.",
        value: false,
        var: extras,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                if (val) extras = true
                if (!val) extras = false
                input.checked = val
                current.innerText = val
                
                if (!val) {
                    const names = document.getElementsByClassName("extrabox")
                    for (let element of names) {
                        element.style.display = "none"
                    };
                } else {
                    const names = document.getElementsByClassName("extrabox")
                    for (let element of names) {
                        element.style.display = "block"
                    };
                }
            }
        },
    },
    {
        name: "Darker when unobtained",
        dbname: "dwu",
        desc: "Changes if the Pokémon shown in the Pokédex Tracker turn darker when they are unobtained.",
        value: true,
        var: darkenWhenUnobtained,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                if (refreshC3 != 0) {document.getElementById("refpls").style.display = "block"} else {refreshC3 = 1}
                darkenWhenUnobtained = val
                input.checked = val
                current.innerText = val
                if (!val) {
                    const names = document.getElementsByClassName("pkmnimg")
                    for (let element of names) {
                        element.style.filter = "brightness(100%)"
                    };
                }
                
            }
        },
    }
]

let boxes = []
let pokemonData = {}

import {obtainStatus, obtainMethod} from "./data/basedata.js"
import {gen3pokemonData} from "./data/gen3data.js"
import {pbrsboxes} from "./data/pbrsboxesdata.js"

if (game == "pbrs") boxes = pbrsboxes
if (game == "pbrs" || game == "gen3") pokemonData = gen3pokemonData

addEventListener("load", () => {
    const trackermenu = document.getElementById("trackermenu")
    const databasemenu = document.getElementById("databasemenu")
    const optionsmenu = document.getElementById("optionsmenu")
    const tracker = document.getElementById("tracker")
    const database = document.getElementById("database")
    const options = document.getElementById("options")
    try {
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[0].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 0
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[1].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 1
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[2].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 2
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[3].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 3
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[4].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 4
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
        db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${settings[5].dbname}`).on("value", function(snapshot) {
            const val = snapshot.val().value
            const setting = 5
            const optionDiv = document.getElementById(settings[setting].dbname)
            const current = optionDiv.childNodes[1]
            const input = optionDiv.childNodes[2]
            try {settings[setting].type.func(val, input, current)} catch(e) {console.log(e)}
        })
    } catch(e) {
        console.log(e)
    }
    Object.keys(pokemonData).forEach((pkmnNum, i) => {
        try {
            const pkmnData = pokemonData[pkmnNum]
            if (pkmnData.database) {
                const rubyArray = Object.keys(pkmnData.ruby)
                const sapphireArray = Object.keys(pkmnData.sapphire)
                const fireredArray = Object.keys(pkmnData.firered)
                const leafgreenArray = Object.keys(pkmnData.leafgreen)
                const emeraldArray = Object.keys(pkmnData.emerald)
                const colosseumArray = Object.keys(pkmnData.colosseum)
                const xdArray = Object.keys(pkmnData.xd)
                if (rubyArray.length == 0 || sapphireArray.length == 0 || fireredArray.length == 0 || leafgreenArray.length == 0 || emeraldArray.length == 0 || colosseumArray.length == 0 || xdArray.length == 0 || rubyArray == null || sapphireArray == null || fireredArray == null || leafgreenArray == null || emeraldArray == null || colosseumArray == null || xdArray == null) {

                } else {
                    function getPkmnSummaryFromData(dta, endTxt) {
                        let methodSeperation = `<p class="blktxt smolbr">---</p>`
                        let rubyMsg = "";
                        let sapphireMsg = "";
                        let fireredMsg = "";
                        let leafgreenMsg = "";
                        let emeraldMsg = "";
                        let colosseumMsg = "";
                        let xdMsg = "";
                        dta.ruby.methods.forEach((method, i) => {
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
                        dta.sapphire.methods.forEach((method, i) => {
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
                        dta.firered.methods.forEach((method, i) => {
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
                        dta.leafgreen.methods.forEach((method, i) => {
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
                        dta.emerald.methods.forEach((method, i) => {
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
                        dta.colosseum.methods.forEach((method, i) => {
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
                        dta.xd.methods.forEach((method, i) => {
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
                        var extended = `<h6 class="bigtxt blktxt"><b class="headinglmao">${dta.name}</b><p class="smolbr"></p><p class="smolbr"></p>${ras}<br><p class="smolbr"></p>${fralg}<br><p class="smolbr"></p><b class="emeraldtxt">Pokémon Emerald:</b> ${emeraldMsg}<br><p class="smolbr"></p>${caxd}<br><p class="smolbr"><b id="eandc">${endTxt}</b></h6>`
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
                        const img = document.createElement("img")
                        img.setAttribute("class", "pkmnimgdb")
                        img.setAttribute("pkmnId", pkmnData.id)
                        img.src = `${baseImgURL}/${sprites}/normal/${shiny}/${pkmnData.id}.png${endURL}`
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

                        let allFormInfos = []

                        forms.forEach(formid => {
                            const pkmnDataFromID = pokemonData[formid]
                            const extendedSummary = getPkmnSummaryFromData(pkmnDataFromID, "")
                            const coexistance2 = document.createElement("div")
                            coexistance2.setAttribute("class", "combineimgandtxtwoutcenter")
                            const img2 = document.createElement("img")
                            img2.setAttribute("class", "pkmnimgdb")
                            img2.setAttribute("pkmnId", pkmnDataFromID.id)
                            img2.src = `${baseImgURL}/${sprites}/normal/${shiny}/${pkmnDataFromID.id}.png${endURL}`
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
                        databasemenu.append(box)
                    } else {
                        const extendedSummary = getPkmnSummaryFromData(pkmnData, "(Click to collapse)")
                        var collapsed = `<h6 class="bigtxt blktxt"><b class="headinglmao">${pkmnData.name}</b><p class="smolbr"></p><b id="eandc">(Click to expand)</b></h6>`
                        const box = document.createElement("div")
                        box.setAttribute("class", "boxdb")
                        const br = document.createElement("br")
                        const coexistance = document.createElement("div")
                        coexistance.setAttribute("class", "combineimgandtxtwoutcenter")
                        const img = document.createElement("img")
                        img.setAttribute("class", "pkmnimgdb")
                        img.setAttribute("pkmnId", pkmnData.id)
                        img.src = `${baseImgURL}/${sprites}/normal/${shiny}/${pkmnData.id}.png${endURL}`
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
            }
            
        } catch(e) {
            console.log(e)
        }
    })
    const br = document.createElement("br")
    const br2 = document.createElement("br")
    databasemenu.append(br)
    databasemenu.append(br2)
   
    boxes.forEach((box, i) => {
        if (box[0].header == true) {
            const headerId = box[0].id
            const headerContainer = document.createElement("div")
            headerContainer.setAttribute("class", "boxcontainer")
            headerContainer.setAttribute("id", `box${headerId}container`)
        } else {
            const boxId = box[0].id
            const extraVal = box[0].extra
            const boxcontainer = document.createElement("div")
            if (extraVal) boxcontainer.setAttribute("class", "boxcontainer extrabox")
            if (!extraVal) boxcontainer.setAttribute("class", "boxcontainer")
            boxcontainer.setAttribute("id", `box${boxId}container`)
            const boxheader = document.createElement("img")
            const numberedHeadings = settings[2].value
            if (numberedHeadings) boxheader.src = `${baseBoxURL}/header/numbered/box${boxId}.png`
            if (!numberedHeadings) boxheader.src = `${baseBoxURL}/header/standard/box${boxId}.png`
            boxheader.setAttribute("class", "boxheader")
            boxheader.setAttribute("id", `box${boxId}header`)
            boxheader.setAttribute("boxid", `${boxId}`)
            const boxE = document.createElement("div")
            boxE.setAttribute("class", "box")
            boxE.setAttribute("id", `box${boxId}`)
            const br = document.createElement("br")
            const br2 = document.createElement("br")
            boxcontainer.append(br)
            boxcontainer.append(boxheader)
            boxcontainer.append(boxE)
            boxcontainer.append(br2)
            document.getElementById("trackermenu").append(boxcontainer)
            box.forEach(pokemon => {
                if (pokemon == null) pokemon = pokemonData[0]
                if (pokemon.name != "getinfo") {
                    boxE.style = `background-image: url("${baseBoxURL}/body/standard/box${boxId}.png");`
                    const pkmnDiv = document.createElement("div")
                    pkmnDiv.style = `display: inline; position: relative; text-align: center; object-fit: contain; user-select: none;`
                    pkmnDiv.setAttribute("class", "pokemonDiv")
                    pkmnDiv.setAttribute("id", "pkmn"+pokemon.id)
                    const pkmnImg = document.createElement("img")
                    pkmnImg.src = `${baseImgURL}/${sprites}/normal/${shiny}/${pokemon.id}.png${endURL}`
                    pkmnImg.setAttribute("id", "pkmnimg"+pokemon.id)
                    pkmnImg.setAttribute("pkmnid", pokemon.id)
                    pkmnImg.setAttribute("class", "pkmnimg")
                    const size = 12
                    pkmnImg.style = `object-fit: contain; opacity: 1; border-radius: 10px; width: ${boxE.clientWidth / size}px; height: ${boxE.clientWidth / (size+1.5)}px; user-select: none;`;
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
                        if (darkenWhenUnobtained) pkmnImg.style.filter = "brightness(30%)"
                        pkmnDiv.style.cursor = "pointer"
                        let obtained = false
                        pkmnDiv.onmouseenter = () => {
                            //fade into something
                            pkmnSubtitleDiv.style.display = "block"
                            if (sprites == 2) {
                                if (emeraldAnimation == 2) {
                                    pkmnImg.src = `${baseImgURL}/${sprites}/animated/${shiny}/${pokemon.id}.gif${endURL}`
                                    pkmnImg.style.scale = 1.5
                                } else if (emeraldAnimation == 1) {
                                    pkmnImg.src = `${baseImgURL}/${sprites}/frame2/${shiny}/${pokemon.id}.png${endURL}`
                                    pkmnImg.style.scale = 1
                                }
                            }
                        }

                        pkmnDiv.onmouseleave = () => {
                            //fade out lmao
                            pkmnSubtitleDiv.style.display = "none"
                            if (emeraldAnimation != 4 && emeraldAnimation != 3) {
                                pkmnImg.src = `${baseImgURL}/${sprites}/normal/${shiny}/${pokemon.id}.png${endURL}`
                                pkmnImg.style.scale = 1
                            }
                            
                        }

                        pkmnDiv.onmouseup = () => {
                            try {
                                db.ref(`/users/${localStorage.getItem("token")}/pbrs/pkmn/${pokemon.id}`).once("value", function(snapshot) {
                                    try {
                                        const data = snapshot.val()
                                        const obtained = data["obtained"]
                                        db.ref(`/users/${localStorage.getItem("token")}/pbrs/pkmn/${pokemon.id}`).set({
                                            id: pokemon.id,
                                            obtained: !obtained,
                                        })
                                    } catch(e) {
                                        try {
                                            db.ref(`/users/${localStorage.getItem("token")}/pbrs/pkmn/${pokemon.id}`).set({
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
            })
        }
    });
    document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
    document.getElementById("home").onclick = () => { window.location.href = "../" }
    document.getElementById("reftxt").onclick = () => { window.location.href = "./" }
    document.getElementById("lyras").onclick = () => { window.location.href = "http://i-made-a.website" }
    document.getElementById("bulba").onclick = () => { window.location.href = "https://bulbapedia.bulbagarden.net/wiki/Main_Page" }
    document.getElementById("sereb").onclick = () => { window.location.href = "https://www.serebii.net" }
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").style.display = "inline"
    document.getElementById("databasemenu").style.display = "none"
    document.getElementById("optionsmenu").style.display = "none"
    document.getElementById("notutd").style.display = "block"
    document.getElementById("tracker").style.textDecoration = "underline"
    db.ref(`/users/${localStorage.getItem("token")}`).once("value", function(snapshot) {
        const data = snapshot.val()
        const username = data.username
        const usernameTxt = document.getElementById("user")
        usernameTxt.innerText = "Signed in as: "+username
    })
    db.ref(`/users/${localStorage.getItem("token")}/pbrs/pkmn/`).on("value", function(snapshot) {
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
                            if (darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (!darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (emeraldAnimation == 3 && sprites == 2) {
                                pkmnElement.style.scale == 1.5
                                pkmnElement.src = `${baseImgURL}/${sprites}/animated/${shiny}/${id}.gif${endURL}`
                                
                            }
                        } else {
                            pkmnElement.style.opacity = 0.4
                            if (darkenWhenUnobtained) pkmnElement.style.filter = "brightness(30%)"
                            if (!darkenWhenUnobtained) pkmnElement.style.filter = "brightness(100%)"
                            if (emeraldAnimation == 3 && sprites == 2) {
                                pkmnElement.style.scale == 1
                                pkmnElement.src = `${baseImgURL}/${sprites}/normal/${shiny}/${id}.png${endURL}`
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
                db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${dbname}`).set({
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
                db.ref(`/users/${localStorage.getItem("token")}/pbrs/settings/${dbname}`).set({
                    value: element.checked
                })
            }
        }
    });
    const br3 = document.createElement("br")
    optionsmenu.append(br3)

    document.getElementById("tracker").onclick = () => {
        trackermenu.style.display = "inline"
        databasemenu.style.display = "none"
        optionsmenu.style.display = "none"
        tracker.style.textDecoration = "underline"
        database.style.textDecoration = "none"
        options.style.textDecoration = "none"
    }
    document.getElementById("database").onclick = () => {
        trackermenu.style.display = "none"
        databasemenu.style.display = "inline"
        optionsmenu.style.display = "none"
        tracker.style.textDecoration = "none"
        database.style.textDecoration = "underline"
        options.style.textDecoration = "none"
    }
    document.getElementById("options").onclick = () => {
        trackermenu.style.display = "none"
        databasemenu.style.display = "none"
        optionsmenu.style.display = "inline"
        tracker.style.textDecoration = "none"
        database.style.textDecoration = "none"
        options.style.textDecoration = "underline"
    }
})