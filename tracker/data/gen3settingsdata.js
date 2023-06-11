import { gen3boxesheaderless } from "./gen3boxesdata.js"

//settings
let sprites = 3
let emeraldAnimation = 0
let boxgame = "rs"
let shiny = "no"
let darkenWhenUnobtained = true
let numberedHeadings = true
let extras = false

let gen3vars = {
    sprites: sprites,
    emeraldAnimation: emeraldAnimation,
    boxgame: boxgame,
    shiny: shiny,
    darkenWhenUnobtained: darkenWhenUnobtained,
    numberedHeadings: numberedHeadings,
    extras: extras,
}

let refreshC1 = 0
let refreshC2 = 0
let refreshC3 = 0

const url = "https://fpt-imgs.up.railway.app/"

const baseImgURL = `${url}icon/gen3` //https://fpt-imgs.up.railway.app/icon/gen3/{vars.spritesNum}/{normal/frame2/animated}/{shiny/no}/{file}
const endURL = ""

const baseBoxURL = `${url}box/gen3` //https://fpt-imgs.up.railway.app/box/(body/head)/(standard/numbered head only)/{file}

let gen3settings = [
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
                gen3vars.sprites = val
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
                gen3vars.emeraldAnimation = val
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
        name: "Origin of game for boxes",
        dbname: "boxgame",
        desc: "Changes the type of box sprite shown in the background of a box.",
        var: boxgame,
        type: {
            type: "linear",
            options: [
                {name: "Ruby & Sapphire", short: "rs"},
                {name: "FireRed & LeafGreen", short: "frlg"},
                {name: "Emerald", short: "e"},
            ],
            func: function (val, input, current) {
                let origin = this.options[val].short
                boxgame = origin
                gen3vars.boxgame = origin
                input.value = val
                current.innerText = this.options[val].name
                const boxbgs = document.getElementsByClassName("box")
                for (let box of boxbgs) {
                    const boxId = box.getAttribute("boxid")
                    box.style.backgroundImage = `url("${baseBoxURL}/body/${origin}/box${boxId}.png")`
                }
                const names = document.getElementsByClassName("boxheader")
                for (let element of names) {
                    const id = element.getAttribute("boxid")
                    element.src = `${baseBoxURL}/header/${origin}/box${id}.png`
                };
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
                gen3vars.numberedHeadings = val
                input.checked = val
                current.innerText = val
                const names = document.getElementsByClassName("boxheadertitletext")
                for (let element of names) {
                    const boxid = element.getAttribute("boxid")
                    if (val) element.innerText = gen3boxesheaderless[parseInt(boxid)][0].altboxName
                    if (!val) element.innerText = gen3boxesheaderless[parseInt(boxid)][0].boxName
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
                gen3vars.shiny = shiny
                input.checked = val
                current.innerText = shiny
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
                extras = val
                gen3vars.extras = val
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
        name: "Darken when unobtained",
        dbname: "dwu",
        desc: "Changes if the Pokémon shown in the Pokédex Tracker turn darker when they are unobtained.",
        value: true,
        var: darkenWhenUnobtained,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                if (refreshC3 != 0) {document.getElementById("refpls").style.display = "block"} else {refreshC3 = 1}
                gen3vars.darkenWhenUnobtained = val
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

export {gen3settings, gen3vars}