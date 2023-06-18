import {obtainStatus, obtainMethod} from "../basedata.js"
import {gen3pokemonData} from "../gen3/gen3data.js"
let pokemonData = gen3pokemonData

const gen3summarise = function(dta, endTxt) {
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                rubyMsg = rubyMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                rubyMsg = rubyMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                rubyMsg = rubyMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                rubyMsg = rubyMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                sapphireMsg = sapphireMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                sapphireMsg = sapphireMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                sapphireMsg = sapphireMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                sapphireMsg = sapphireMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                fireredMsg = fireredMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                fireredMsg = fireredMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                fireredMsg = fireredMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                fireredMsg = fireredMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                leafgreenMsg = leafgreenMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                leafgreenMsg = leafgreenMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                leafgreenMsg = leafgreenMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                leafgreenMsg = leafgreenMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                emeraldMsg = emeraldMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                emeraldMsg = emeraldMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                emeraldMsg = emeraldMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                emeraldMsg = emeraldMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                colosseumMsg = colosseumMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                colosseumMsg = colosseumMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                colosseumMsg = colosseumMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                colosseumMsg = colosseumMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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
                    case obtainMethod.trade_ingame:
                        if (method.an) {
                            if (method.on) {
                                xdMsg = xdMsg + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                xdMsg = xdMsg + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        } else {
                            if (method.on) {
                                xdMsg = xdMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " on " +method.location
                            } else {
                                xdMsg = xdMsg + "n" + pokemonData[""+method.send].name + " to " +method.recipient + " in " +method.location
                            }
                        }
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

export {gen3summarise}