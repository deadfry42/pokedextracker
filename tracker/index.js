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

const baseImgURL = `${url}icon/pbrs` //https://imghoster-fpd.up.railway.app/icon/pbrs/{spritesNum}/{normal/frame2/animated}/{shiny/no}/{file}
const endURL = ""

const baseBoxURL = `${url}box/pbrs` //https://imghoster-fpd.up.railway.app/box/(body/head)/(standard/numbered head only)/{file}

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

//settings
let sprites = 3
let emeraldAnimation = 0
let numberedHeadings = true
let shiny = "no"
let darkenWhenUnobtained = true

const settings = [
    {
        name: "Gen 3 Sprite Type",
        dbname: "sprites",
        desc: "Changes the type of sprite shown on the Pokédex Tracker & Pokémon Database pages. Note: Pokémon Database images do not animate.",
        var: sprites,
        refresh: false,
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
        refresh: true,
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
                emeraldAnimation = val
                input.value = val
                current.innerText = this.options[val].name
                if (shiny == "no") {
                    if (val == 4 && sprites == 2) {
                        console.log("eee")
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
        refresh: false,
        var: numberedHeadings,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                numberedHeadings = val
                input.checked = val
                current.innerText = val
                const names = document.getElementsByClassName("boxheader")
                console.log(names)
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
        refresh: true,
        var: shiny,
        type: {
            type: "boolean",
            func: function (val, input, current) {
                if (val) shiny = "shiny"
                if (!val) shiny = "no"
                input.checked = val
                current.innerText = val
            }
        },
    },
    {
        name: "Darker when unobtained",
        dbname: "dwu",
        desc: "Changes if the Pokémon shown in the Pokédex Tracker turn darker when they are unobtained.",
        value: true,
        refresh: true,
        var: darkenWhenUnobtained,
        type: {
            type: "boolean",
            func: function (val, input, current) {
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

const items = {
    antidote: "Antidote",
    _awakening: "Awakening",
    _bicycle: "Bicycle",
    _bike_voucher: "Bike Voucher",
    _burn_heal: "Burn Heal",
    _calcium: "Calcium",
    _carbos: "Carbos",
    _card_key__kanto_: "Card Key (Kanto)",
    _coin_case: "Coin Case",
    _dire_hit: "Dire Hit",
    _dome_fossil: "Dome Fossil",
    _dowsing_machine: "Dowsing Machine",
    _elixir: "Elixir",
    _escape_rope: "Escape Rope",
    _ether: "Ether",
    _exp_share: "Exp. Share",
    _fire_stone: "Fire Stone",
    _fresh_water: "Fresh Water",
    _full_heal: "Full Heal",
    _full_restore: "Full Restore",
    _gold_teeth: "Gold Teeth",
    _good_rod: "Good Rod",
    _great_ball: "Great Ball",
    _guard_spec: "Guard Spec.",
    _helix_fossil: "Helix Fossil",
    _hm01: "HM01",
    _hm02: "HM02",
    _hm03: "HM03",
    _hm04: "HM04",
    _hm05: "HM05",
    _hp_up: "HP Up",
    _hyper_potion: "Hyper Potion",
    _ice_heal: "Ice Heal",
    _iron: "Iron",
    _leaf_stone: "Leaf Stone",
    _lemonade: "Lemonade",
    _lift_key: "Lift Key",
    _master_ball: "Master Ball",
    _max_elixir: "Max Elixir",
    _max_ether: "Max Ether",
    _max_potion: "Max Potion",
    _max_repel: "Max Repel",
    _max_revive: "Max Revive",
    _moon_stone: "Moon Stone",
    _nugget: "Nugget",
    _old_amber: "Old Amber",
    _old_rod: "Old Rod",
    _paralyze_heal: "Paralyze Heal",
    _parcel: "Parcel",
    _poké_ball__item_: "Poké Ball (item)",
    _poké_doll: "Poké Doll",
    _poké_flute: "Poké Flute",
    _potion: "Potion",
    _pp_up: "PP Up",
    _protein: "Protein",
    _rare_candy: "Rare Candy",
    _repel: "Repel",
    _revive: "Revive",
    _ss_ticket: "S.S. Ticket",
    _safari_ball: "Safari Ball",
    _secret_key__kanto_: "Secret Key (Kanto)",
    _silph_scope: "Silph Scope",
    _soda_pop: "Soda Pop",
    _super_potion: "Super Potion",
    _super_repel: "Super Repel",
    _super_rod: "Super Rod",
    _thunder_stone: "Thunder Stone",
    _user_chosen_sandbox_tm01: "User:Chosen/Sandbox/TM01",
    _tm001: "TM001",
    _tm002: "TM002",
    _tm003: "TM003",
    _tm004: "TM004",
    _tm005: "TM005",
    _tm006: "TM006",
    _tm007: "TM007",
    _tm008: "TM008",
    _tm009: "TM009",
    _tm010: "TM010",
    _tm011: "TM011",
    _tm012: "TM012",
    _tm013: "TM013",
    _tm014: "TM014",
    _tm015: "TM015",
    _tm016: "TM016",
    _tm017: "TM017",
    _tm018: "TM018",
    _tm019: "TM019",
    _tm020: "TM020",
    _tm021: "TM021",
    _tm022: "TM022",
    _tm023: "TM023",
    _tm024: "TM024",
    _tm025: "TM025",
    _tm026: "TM026",
    _tm027: "TM027",
    _tm028: "TM028",
    _tm029: "TM029",
    _tm030: "TM030",
    _tm031: "TM031",
    _tm032: "TM032",
    _tm033: "TM033",
    _tm034: "TM034",
    _tm035: "TM035",
    _tm036: "TM036",
    _tm037: "TM037",
    _tm038: "TM038",
    _tm039: "TM039",
    _tm040: "TM040",
    _tm041: "TM041",
    _tm042: "TM042",
    _tm043: "TM043",
    _tm044: "TM044",
    _tm045: "TM045",
    _tm046: "TM046",
    _tm047: "TM047",
    _tm048: "TM048",
    _tm049: "TM049",
    _tm050: "TM050",
    _town_map: "Town Map",
    _ultra_ball: "Ultra Ball",
    _water_stone: "Water Stone",
    _x_accuracy: "X Accuracy",
    _x_attack: "X Attack",
    _x_defense: "X Defense",
    _x_sp_atk: "X Sp. Atk",
    _x_speed: "X Speed",
    _amulet_coin: "Amulet Coin",
    _basement_key__johto_: "Basement Key (Johto)",
    _berry__item_: "Berry (item)",
    _berry_juice: "Berry Juice",
    _berserk_gene: "Berserk Gene",
    _big_mushroom: "Big Mushroom",
    _big_pearl: "Big Pearl",
    _bitter_berry: "Bitter Berry",
    _black_apricorn: "Black Apricorn",
    _black_belt__item_: "Black Belt (item)",
    _black_glasses: "Black Glasses",
    _blue_apricorn: "Blue Apricorn",
    _blue_card: "Blue Card",
    _brick_piece: "Brick Piece",
    _bright_powder: "Bright Powder",
    _burnt_berry: "Burnt Berry",
    _card_key__johto_: "Card Key (Johto)",
    _charcoal: "Charcoal",
    _cleanse_tag: "Cleanse Tag",
    _clear_bell: "Clear Bell",
    _dragon_fang: "Dragon Fang",
    _dragon_scale: "Dragon Scale",
    _egg_ticket: "Egg Ticket",
    _energy_powder: "Energy Powder",
    _energy_root: "Energy Root",
    _everstone: "Everstone",
    _fast_ball: "Fast Ball",
    _focus_band: "Focus Band",
    _friend_ball: "Friend Ball",
    _gold_berry: "Gold Berry",
    _gold_leaf: "Gold Leaf",
    _gorgeous_box: "Gorgeous Box",
    _green_apricorn: "Green Apricorn",
    _gs_ball: "GS Ball",
    _hard_stone: "Hard Stone",
    _heal_powder: "Heal Powder",
    _heavy_ball: "Heavy Ball",
    _hm06: "HM06",
    _hm07: "HM07",
    _ice_berry: "Ice Berry",
    _kings_rock: "King's Rock",
    _leek: "Leek",
    _leftovers: "Leftovers",
    _level_ball: "Level Ball",
    _light_ball: "Light Ball",
    _lost_item: "Lost Item",
    _love_ball: "Love Ball",
    _lucky_egg: "Lucky Egg",
    _lucky_punch: "Lucky Punch",
    _lure_ball: "Lure Ball",
    _machine_part: "Machine Part",
    _magnet: "Magnet",
    _metal_coat: "Metal Coat",
    _metal_powder: "Metal Powder",
    _mint_berry: "Mint Berry",
    _miracle_seed: "Miracle Seed",
    _miracleberry: "MiracleBerry",
    _moomoo_milk: "Moomoo Milk",
    _moon_ball: "Moon Ball",
    _mystery_egg: "Mystery Egg",
    _mysteryberry: "MysteryBerry",
    _mystic_water: "Mystic Water",
    _never_melt_ice: "Never-Melt Ice",
    _normal_box: "Normal Box",
    _pass: "Pass",
    _pearl__item_: "Pearl (item)",
    _pink_apricorn: "Pink Apricorn",
    _pink_bow: "Pink Bow",
    _poison_barb: "Poison Barb",
    _polkadot_bow: "Polkadot Bow",
    _przcureberry: "PRZCureBerry",
    _psncureberry: "PSNCureBerry",
    _quick_claw: "Quick Claw",
    _rage_candy_bar: "Rage Candy Bar",
    _rainbow_wing: "Rainbow Wing",
    _red_apricorn: "Red Apricorn",
    _red_scale: "Red Scale",
    _revival_herb: "Revival Herb",
    _sacred_ash: "Sacred Ash",
    _scope_lens: "Scope Lens",
    _secret_medicine: "Secret Medicine",
    _sharp_beak: "Sharp Beak",
    _silver_leaf: "Silver Leaf",
    _silver_powder: "Silver Powder",
    _silver_wing: "Silver Wing",
    _slowpoke_tail: "Slowpoke Tail",
    _smoke_ball: "Smoke Ball",
    _soft_sand: "Soft Sand",
    _spell_tag: "Spell Tag",
    _sport_ball: "Sport Ball",
    _squirt_bottle: "Squirt Bottle",
    _star_piece: "Star Piece",
    _stardust: "Stardust",
    _sun_stone: "Sun Stone",
    _teru_sama: "Teru-sama",
    _thick_club: "Thick Club",
    _tiny_mushroom: "Tiny Mushroom",
    _twisted_spoon: "Twisted Spoon",
    _upgrade: "Upgrade",
    _white_apricorn: "White Apricorn",
    _yellow_apricorn: "Yellow Apricorn",
    _acro_bike: "Acro Bike",
    _aguav_berry: "Aguav Berry",
    _apicot_berry: "Apicot Berry",
    _aspear_berry: "Aspear Berry",
    _auroraticket: "AuroraTicket",
    _basement_key__hoenn_: "Basement Key (Hoenn)",
    _battle_cd: "Battle CD",
    _belue_berry: "Belue Berry",
    _berry_pouch: "Berry Pouch",
    _black_flute: "Black Flute",
    _blu_id_badge: "Blu ID Badge",
    _blue_flute: "Blue Flute",
    _blue_orb: "Blue Orb",
    _blue_scarf: "Blue Scarf",
    _blue_shard: "Blue Shard",
    _bluk_berry: "Bluk Berry",
    _bonsly_card: "Bonsly Card",
    _bonsly_photo: "Bonsly Photo",
    _card_key__orre_: "Card Key (Orre)",
    _cheri_berry: "Cheri Berry",
    _chesto_berry: "Chesto Berry",
    _chilan_berry__generation_iii_: "Chilan Berry (Generation III)",
    _choice_band: "Choice Band",
    _claw_fossil: "Claw Fossil",
    _cologne_case: "Cologne Case",
    _contest_pass: "Contest Pass",
    _cornn_berry: "Cornn Berry",
    _cry_analyzer: "Cry Analyzer",
    _d_disk: "D-Disk",
    _data_rom: "Data ROM",
    _deep_sea_scale: "Deep Sea Scale",
    _deep_sea_tooth: "Deep Sea Tooth",
    _devon_parts: "Devon Parts",
    _devon_scope: "Devon Scope",
    _disc_case: "Disc Case",
    _dive_ball: "Dive Ball",
    _dna_sample: "DNA Sample",
    _down_st_key: "Down St. Key",
    _drash_berry: "Drash Berry",
    _durin_berry: "Durin Berry",
    _eggant_berry: "Eggant Berry",
    _ein_file: "Ein File",
    _elevator_key__orre_: "Elevator Key (Orre)",
    _enigma_berry: "Enigma Berry",
    _eon_ticket: "Eon Ticket",
    _excite_scent: "Excite Scent",
    _f_disk: "F-Disk",
    _fame_checker: "Fame Checker",
    _figy_berry: "Figy Berry",
    _fluffy_tail: "Fluffy Tail",
    _ganlon_berry: "Ganlon Berry",
    _gear__item_: "Gear (item)",
    _ginema_berry: "Ginema Berry",
    _go_goggles: "Go-Goggles",
    _gonzaps_key: "Gonzap's Key",
    _green_scarf: "Green Scarf",
    _green_shard: "Green Shard",
    _grepa_berry: "Grepa Berry",
    _grn_id_badge: "Grn ID Badge",
    _heart_scale: "Heart Scale",
    _hm08: "HM08",
    _hondew_berry: "Hondew Berry",
    _iapapa_berry: "Iapapa Berry",
    _id_card: "ID Card",
    _jail_key: "Jail Key",
    _joy_scent: "Joy Scent",
    _kelpsy_berry: "Kelpsy Berry",
    _key_to_room_1: "Key to Room 1",
    _key_to_room_2: "Key to Room 2",
    _key_to_room_4: "Key to Room 4",
    _key_to_room_6: "Key to Room 6",
    _krane_memo: "Krane Memo",
    _kuo_berry: "Kuo Berry",
    _l_disk: "L-Disk",
    _lansat_berry: "Lansat Berry",
    _lava_cookie: "Lava Cookie",
    _lax_incense: "Lax Incense",
    _leppa_berry: "Leppa Berry",
    _letter: "Letter",
    _liechi_berry: "Liechi Berry",
    _lum_berry: "Lum Berry",
    _luxury_ball: "Luxury Ball",
    _mach_bike: "Mach Bike",
    _machine_part__orre_: "Machine Part (Orre)",
    _macho_brace: "Macho Brace",
    _magma_emblem: "Magma Emblem",
    _mago_berry: "Mago Berry",
    _magost_berry: "Magost Berry",
    _maingate_key: "Maingate Key",
    _mayors_note: "Mayor's Note",
    _mental_herb: "Mental Herb",
    _meteorite: "Meteorite",
    _miror_radar: "Miror Radar",
    _moon_shard: "Moon Shard",
    _music_disc: "Music Disc",
    _mysticticket: "MysticTicket",
    _nanab_berry: "Nanab Berry",
    _nest_ball: "Nest Ball",
    _net_ball: "Net Ball",
    _niniku_berry: "Niniku Berry",
    _nomel_berry: "Nomel Berry",
    _nutpea_berry: "Nutpea Berry",
    _old_sea_map: "Old Sea Map",
    _oran_berry: "Oran Berry",
    _pamtre_berry: "Pamtre Berry",
    _pecha_berry: "Pecha Berry",
    _persim_berry: "Persim Berry",
    _petaya_berry: "Petaya Berry",
    _pinap_berry: "Pinap Berry",
    _pink_scarf: "Pink Scarf",
    _poké_snack: "Poké Snack",
    _pokéblock_case: "Pokéblock Case",
    _pomeg_berry: "Pomeg Berry",
    _powder_jar: "Powder Jar",
    _powerup_part: "Powerup Part",
    _pp_max: "PP Max",
    _premier_ball: "Premier Ball",
    _pumkin_berry: "Pumkin Berry",
    _qualot_berry: "Qualot Berry",
    _r_disk: "R-Disk",
    _rabuta_berry: "Rabuta Berry",
    _rainbow_pass: "Rainbow Pass",
    _rawst_berry: "Rawst Berry",
    _razz_berry: "Razz Berry",
    _red_flute: "Red Flute",
    _red_id_badge: "Red ID Badge",
    _red_orb: "Red Orb",
    _red_scarf: "Red Scarf",
    _red_shard: "Red Shard",
    _repeat_ball: "Repeat Ball",
    _root_fossil: "Root Fossil",
    _ruby__item_: "Ruby (item)",
    _salac_berry: "Salac Berry",
    _sapphire__item_: "Sapphire (item)",
    _scanner: "Scanner",
    _sea_incense: "Sea Incense",
    _shell_bell: "Shell Bell",
    _shoal_salt: "Shoal Salt",
    _shoal_shell: "Shoal Shell",
    _silk_scarf: "Silk Scarf",
    _sitrus_berry: "Sitrus Berry",
    _small_tablet: "Small Tablet",
    _soot_sack: "Soot Sack",
    _soothe_bell: "Soothe Bell",
    _soul_dew: "Soul Dew",
    _spelon_berry: "Spelon Berry",
    _starf_berry: "Starf Berry",
    _steel_teeth: "Steel Teeth",
    _storage_key__hoenn_: "Storage Key (Hoenn)",
    _strib_berry: "Strib Berry",
    _subway_key: "Subway Key",
    _sun_shard: "Sun Shard",
    _system_lever: "System Lever",
    _tamato_berry: "Tamato Berry",
    _tea: "Tea",
    _teachy_tv: "Teachy TV",
    _time_flute: "Time Flute",
    _timer_ball: "Timer Ball",
    _tm_case: "TM Case",
    _topo_berry: "Topo Berry",
    _touga_berry: "Touga Berry",
    _tri_pass: "Tri-Pass",
    _u_disk: "U-Disk",
    _vivid_scent: "Vivid Scent",
    _voice_case: "Voice Case",
    _vs_seeker: "Vs. Seeker",
    _wailmer_pail: "Wailmer Pail",
    _watmel_berry: "Watmel Berry",
    _wepear_berry: "Wepear Berry",
    _white_flute: "White Flute",
    _white_herb: "White Herb",
    _wiki_berry: "Wiki Berry",
    _yago_berry: "Yago Berry",
    _yellow_flute: "Yellow Flute",
    _yellow_scarf: "Yellow Scarf",
    _yellow_shard: "Yellow Shard",
    _ylw_id_badge: "Ylw ID Badge",
    _zinc: "Zinc",
}

const obtainStatus = {
    obtainable: "Obtainable",
    importable: "Transferrable",
    unobtainable: "Completely unobtainable",
}

const obtainMethod = {
    gift: "Given to the player",
    gift_req: "Given to the player for ",
    catch: "Caught by the player",
    snag: "Snagged by the player",
    evolve_level: "Evolved by level",
    evolve_item: "Evolved by item",
    evolve_friendship: "Evolved by friendship",
    evolve_trade: "Evolve by trading",
    evolve_trade_item: "Evolve by trading while holding ",
    unobtainable: "Unable to be obtained at all",
    pomeg: "Able to be glitched in using Glitzer popping",
    pomeg_location: "Able to use Glitzer popping to spawn in ",
    save_editing: "Requires external save modification to get ",
    channel_pal: "Given to a Ruby/Sapphire cartrige with Pokémon Channel in PAL Regions",
    colosseum_bonus_us: "Given to a Ruby/Sapphire cartridge with the Pokémon Colosseum Bonus Disc in the US",
    colosseum_bonus_jp: "Given to a Ruby/Sapphire cartridge with the Pokémon Colosseum Bonus Disc in Japan",
    box_egg: "Given to the player in Pokémon Box when depositing ",
    box_first: "Given to the player in Pokémon Box when connecting with a new cartridge.",
    purchased: "Bought at ",
    other: "Unknown way to obtain",
}

import {pokemonData, obtainLocation} from "./gen3data.js/"

const box1basenum = 0
const box1 = [
    {name:"getinfo", boxName:"box1",},
    //row1
    pokemonData[box1basenum+1], pokemonData[box1basenum+2], pokemonData[box1basenum+3],
    pokemonData[box1basenum+4],pokemonData[box1basenum+5],pokemonData[box1basenum+6],
    pokemonData[box1basenum+7],pokemonData[box1basenum+8],pokemonData[box1basenum+9],
    pokemonData[box1basenum+10],pokemonData[box1basenum+11],pokemonData[box1basenum+12],
    //row2
    pokemonData[box1basenum+13],pokemonData[box1basenum+14],pokemonData[box1basenum+15],
    pokemonData[box1basenum+16],pokemonData[box1basenum+17],pokemonData[box1basenum+18],
    pokemonData[box1basenum+19],pokemonData[box1basenum+20],pokemonData[box1basenum+21],
    pokemonData[box1basenum+22],pokemonData[box1basenum+23],pokemonData[box1basenum+24],
    //row3
    pokemonData[box1basenum+25],pokemonData[box1basenum+26],pokemonData[box1basenum+27],
    pokemonData[box1basenum+28],pokemonData[box1basenum+29],pokemonData[box1basenum+30],
    pokemonData[box1basenum+31],pokemonData[box1basenum+32],pokemonData[box1basenum+33],
    pokemonData[box1basenum+34],pokemonData[box1basenum+35],pokemonData[box1basenum+36],
    //row4
    pokemonData[box1basenum+37],pokemonData[box1basenum+38],pokemonData[box1basenum+39],
    pokemonData[box1basenum+40],pokemonData[box1basenum+41],pokemonData[box1basenum+42],
    pokemonData[box1basenum+43],pokemonData[box1basenum+44],pokemonData[box1basenum+45],
    pokemonData[box1basenum+46],pokemonData[box1basenum+47],pokemonData[box1basenum+48],
    //row5
    pokemonData[box1basenum+49],pokemonData[box1basenum+50],pokemonData[box1basenum+51],
    pokemonData[box1basenum+52],pokemonData[box1basenum+53],pokemonData[box1basenum+54],
    pokemonData[box1basenum+55],pokemonData[box1basenum+56],pokemonData[box1basenum+57],
    pokemonData[box1basenum+58],pokemonData[box1basenum+59],pokemonData[box1basenum+60],
]

const box2basenum = 60
const box2 = [
    {name:"getinfo", boxName:"box2",},
    //row1
    pokemonData[box2basenum+1], pokemonData[box2basenum+2], pokemonData[box2basenum+3],
    pokemonData[box2basenum+4],pokemonData[box2basenum+5],pokemonData[box2basenum+6],
    pokemonData[box2basenum+7],pokemonData[box2basenum+8],pokemonData[box2basenum+9],
    pokemonData[box2basenum+10],pokemonData[box2basenum+11],pokemonData[box2basenum+12],
    //row2
    pokemonData[box2basenum+13],pokemonData[box2basenum+14],pokemonData[box2basenum+15],
    pokemonData[box2basenum+16],pokemonData[box2basenum+17],pokemonData[box2basenum+18],
    pokemonData[box2basenum+19],pokemonData[box2basenum+20],pokemonData[box2basenum+21],
    pokemonData[box2basenum+22],pokemonData[box2basenum+23],pokemonData[box2basenum+24],
    //row3
    pokemonData[box2basenum+25],pokemonData[box2basenum+26],pokemonData[box2basenum+27],
    pokemonData[box2basenum+28],pokemonData[box2basenum+29],pokemonData[box2basenum+30],
    pokemonData[box2basenum+31],pokemonData[box2basenum+32],pokemonData[box2basenum+33],
    pokemonData[box2basenum+34],pokemonData[box2basenum+35],pokemonData[box2basenum+36],
    //row4
    pokemonData[box2basenum+37],pokemonData[box2basenum+38],pokemonData[box2basenum+39],
    pokemonData[box2basenum+40],pokemonData[box2basenum+41],pokemonData[box2basenum+42],
    pokemonData[box2basenum+43],pokemonData[box2basenum+44],pokemonData[box2basenum+45],
    pokemonData[box2basenum+46],pokemonData[box2basenum+47],pokemonData[box2basenum+48],
    //row5
    pokemonData[box2basenum+49],pokemonData[box2basenum+50],pokemonData[box2basenum+51],
    pokemonData[box2basenum+52],pokemonData[box2basenum+53],pokemonData[box2basenum+54],
    pokemonData[box2basenum+55],pokemonData[box2basenum+56],pokemonData[box2basenum+57],
    pokemonData[box2basenum+58],pokemonData[box2basenum+59],pokemonData[box2basenum+60],
]

const box3basenum = 120
const box3 = [
    {name:"getinfo", boxName:"box3",},
    //row1
    pokemonData[box3basenum+1], pokemonData[box3basenum+2], pokemonData[box3basenum+3],
    pokemonData[box3basenum+4],pokemonData[box3basenum+5],pokemonData[box3basenum+6],
    pokemonData[box3basenum+7],pokemonData[box3basenum+8],pokemonData[box3basenum+9],
    pokemonData[box3basenum+10],pokemonData[box3basenum+11],pokemonData[box3basenum+12],
    //row2
    pokemonData[box3basenum+13],pokemonData[box3basenum+14],pokemonData[box3basenum+15],
    pokemonData[box3basenum+16],pokemonData[box3basenum+17],pokemonData[box3basenum+18],
    pokemonData[box3basenum+19],pokemonData[box3basenum+20],pokemonData[box3basenum+21],
    pokemonData[box3basenum+22],pokemonData[box3basenum+23],pokemonData[box3basenum+24],
    //row3
    pokemonData[box3basenum+25],pokemonData[box3basenum+26],pokemonData[box3basenum+27],
    pokemonData[box3basenum+28],pokemonData[box3basenum+29],pokemonData[box3basenum+30],
    pokemonData[box3basenum+31],pokemonData[box3basenum+32],pokemonData[box3basenum+33],
    pokemonData[box3basenum+34],pokemonData[box3basenum+35],pokemonData[box3basenum+36],
    //row4
    pokemonData[box3basenum+37],pokemonData[box3basenum+38],pokemonData[box3basenum+39],
    pokemonData[box3basenum+40],pokemonData[box3basenum+41],pokemonData[box3basenum+42],
    pokemonData[box3basenum+43],pokemonData[box3basenum+44],pokemonData[box3basenum+45],
    pokemonData[box3basenum+46],pokemonData[box3basenum+47],pokemonData[box3basenum+48],
    //row5
    pokemonData[box3basenum+49],pokemonData[box3basenum+50],pokemonData[box3basenum+51],
    pokemonData[box3basenum+52],pokemonData[box3basenum+53],pokemonData[box3basenum+54],
    pokemonData[box3basenum+55],pokemonData[box3basenum+56],pokemonData[box3basenum+57],
    pokemonData[box3basenum+58],pokemonData[box3basenum+59],pokemonData[box3basenum+60],
]

const box4basenum = 180
const box4 = [
    {name:"getinfo", boxName:"box4",},
    //row1
    pokemonData[box4basenum+1], pokemonData[box4basenum+2], pokemonData[box4basenum+3],
    pokemonData[box4basenum+4],pokemonData[box4basenum+5],pokemonData[box4basenum+6],
    pokemonData[box4basenum+7],pokemonData[box4basenum+8],pokemonData[box4basenum+9],
    pokemonData[box4basenum+10],pokemonData[box4basenum+11],pokemonData[box4basenum+12],
    //row2
    pokemonData[box4basenum+13],pokemonData[box4basenum+14],pokemonData[box4basenum+15],
    pokemonData[box4basenum+16],pokemonData[box4basenum+17],pokemonData[box4basenum+18],
    pokemonData[box4basenum+19],pokemonData[box4basenum+20],pokemonData[box4basenum+21],
    pokemonData[box4basenum+22],pokemonData[box4basenum+23],pokemonData[box4basenum+24],
    //row3
    pokemonData[box4basenum+25],pokemonData[box4basenum+26],pokemonData[box4basenum+27],
    pokemonData[box4basenum+28],pokemonData[box4basenum+29],pokemonData[box4basenum+30],
    pokemonData[box4basenum+31],pokemonData[box4basenum+32],pokemonData[box4basenum+33],
    pokemonData[box4basenum+34],pokemonData[box4basenum+35],pokemonData[box4basenum+36],
    //row4
    pokemonData[box4basenum+37],pokemonData[box4basenum+38],pokemonData[box4basenum+39],
    pokemonData[box4basenum+40],pokemonData[box4basenum+41],pokemonData[box4basenum+42],
    pokemonData[box4basenum+43],pokemonData[box4basenum+44],pokemonData[box4basenum+45],
    pokemonData[box4basenum+46],pokemonData[box4basenum+47],pokemonData[box4basenum+48],
    //row5
    pokemonData[box4basenum+49],pokemonData[box4basenum+50],pokemonData[box4basenum+51],
    pokemonData[box4basenum+52],pokemonData[box4basenum+53],pokemonData[box4basenum+54],
    pokemonData[box4basenum+55],pokemonData[box4basenum+56],pokemonData[box4basenum+57],
    pokemonData[box4basenum+58],pokemonData[box4basenum+59],pokemonData[box4basenum+60],
]

const box5basenum = 240
const box5 = [
    {name:"getinfo", boxName:"box5",},
    //row1
    pokemonData[box5basenum+1], pokemonData[box5basenum+2], pokemonData[box5basenum+3],
    pokemonData[box5basenum+4],pokemonData[box5basenum+5],pokemonData[box5basenum+6],
    pokemonData[box5basenum+7],pokemonData[box5basenum+8],pokemonData[box5basenum+9],
    pokemonData[box5basenum+10],pokemonData[box5basenum+11],pokemonData[box5basenum+12],
    //row2
    pokemonData[box5basenum+13],pokemonData[box5basenum+14],pokemonData[box5basenum+15],
    pokemonData[box5basenum+16],pokemonData[box5basenum+17],pokemonData[box5basenum+18],
    pokemonData[box5basenum+19],pokemonData[box5basenum+20],pokemonData[box5basenum+21],
    pokemonData[box5basenum+22],pokemonData[box5basenum+23],pokemonData[box5basenum+24],
    //row3
    pokemonData[box5basenum+25],pokemonData[box5basenum+26],pokemonData[box5basenum+27],
    pokemonData[box5basenum+28],pokemonData[box5basenum+29],pokemonData[box5basenum+30],
    pokemonData[box5basenum+31],pokemonData[box5basenum+32],pokemonData[box5basenum+33],
    pokemonData[box5basenum+34],pokemonData[box5basenum+35],pokemonData[box5basenum+36],
    //row4
    pokemonData[box5basenum+37],pokemonData[box5basenum+38],pokemonData[box5basenum+39],
    pokemonData[box5basenum+40],pokemonData[box5basenum+41],pokemonData[box5basenum+42],
    pokemonData[box5basenum+43],pokemonData[box5basenum+44],pokemonData[box5basenum+45],
    pokemonData[box5basenum+46],pokemonData[box5basenum+47],pokemonData[box5basenum+48],
    //row5
    pokemonData[box5basenum+49],pokemonData[box5basenum+50],pokemonData[box5basenum+51],
    pokemonData[box5basenum+52],pokemonData[box5basenum+53],pokemonData[box5basenum+54],
    pokemonData[box5basenum+55],pokemonData[box5basenum+56],pokemonData[box5basenum+57],
    pokemonData[box5basenum+58],pokemonData[box5basenum+59],pokemonData[box5basenum+60],
]

const box6basenum = 300
const box6 = [
    {name:"getinfo", boxName:"box6",},
    //row1
    pokemonData[box6basenum+1], pokemonData[box6basenum+2], pokemonData[box6basenum+3],
    pokemonData[box6basenum+4],pokemonData[box6basenum+5],pokemonData[box6basenum+6],
    pokemonData[box6basenum+7],pokemonData[box6basenum+8],pokemonData[box6basenum+9],
    pokemonData[box6basenum+10],pokemonData[box6basenum+11],pokemonData[box6basenum+12],
    //row2
    pokemonData[box6basenum+13],pokemonData[box6basenum+14],pokemonData[box6basenum+15],
    pokemonData[box6basenum+16],pokemonData[box6basenum+17],pokemonData[box6basenum+18],
    pokemonData[box6basenum+19],pokemonData[box6basenum+20],pokemonData[box6basenum+21],
    pokemonData[box6basenum+22],pokemonData[box6basenum+23],pokemonData[box6basenum+24],
    //row3
    pokemonData[box6basenum+25],pokemonData[box6basenum+26],pokemonData[box6basenum+27],
    pokemonData[box6basenum+28],pokemonData[box6basenum+29],pokemonData[box6basenum+30],
    pokemonData[box6basenum+31],pokemonData[box6basenum+32],pokemonData[box6basenum+33],
    pokemonData[box6basenum+34],pokemonData[box6basenum+35],pokemonData[box6basenum+36],
    //row4
    pokemonData[box6basenum+37],pokemonData[box6basenum+38],pokemonData[box6basenum+39],
    pokemonData[box6basenum+40],pokemonData[box6basenum+41],pokemonData[box6basenum+42],
    pokemonData[box6basenum+43],pokemonData[box6basenum+44],pokemonData[box6basenum+45],
    pokemonData[box6basenum+46],pokemonData[box6basenum+47],pokemonData[box6basenum+48],
    //row5
    pokemonData[box6basenum+49],pokemonData[box6basenum+50],pokemonData[box6basenum+51],
    pokemonData[box6basenum+52],pokemonData[box6basenum+53],pokemonData[box6basenum+54],
    pokemonData[box6basenum+55],pokemonData[box6basenum+56],pokemonData[box6basenum+57],
    pokemonData[box6basenum+58],pokemonData[box6basenum+59],pokemonData[box6basenum+60],
]

const box7basenum = 360
const box7 = [
    {name:"getinfo", boxName:"box7",},
    //row1
    pokemonData[box7basenum+1], pokemonData[box7basenum+2], pokemonData[box7basenum+3],
    pokemonData[box7basenum+4],pokemonData[box7basenum+5],pokemonData[box7basenum+6],
    pokemonData[box7basenum+7],pokemonData[box7basenum+8],pokemonData[box7basenum+9],
    pokemonData[box7basenum+10],pokemonData[box7basenum+11],pokemonData[box7basenum+12],
    //row2
    pokemonData[box7basenum+13],pokemonData[box7basenum+14],pokemonData[box7basenum+15],
    pokemonData[box7basenum+16],pokemonData[box7basenum+17],pokemonData[box7basenum+18],
    pokemonData[box7basenum+19],pokemonData[box7basenum+20],pokemonData[box7basenum+21],
    pokemonData[box7basenum+22],pokemonData[box7basenum+23],pokemonData[box7basenum+24],
    //row3
    pokemonData[box7basenum+25],pokemonData[box7basenum+26],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row4
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row5
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
]

const box8basenum = 420
const box8 = [
    {name:"getinfo", boxName:"box8",},
    //row1
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row2
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row3
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row4
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    //row5
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
    pokemonData[0],pokemonData[0],pokemonData[0],
]

const boxes = [
    box1,
    box2,
    box3,
    box4,
    box5,
    box6,
    box7,
]

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
    } catch(e) {
        console.log(e)
    }
    Object.keys(pokemonData).forEach((pkmnNum, i) => {
        try {
            const pkmnData = pokemonData[pkmnNum]
            const rubyArray = Object.keys(pkmnData.ruby)
            const sapphireArray = Object.keys(pkmnData.sapphire)
            const fireredArray = Object.keys(pkmnData.firered)
            const leafgreenArray = Object.keys(pkmnData.leafgreen)
            const emeraldArray = Object.keys(pkmnData.emerald)
            const colosseumArray = Object.keys(pkmnData.colosseum)
            const xdArray = Object.keys(pkmnData.xd)
            if (rubyArray.length == 0 || sapphireArray.length == 0 || fireredArray.length == 0 || leafgreenArray.length == 0 || emeraldArray.length == 0 || colosseumArray.length == 0 || xdArray.length == 0 || rubyArray == null || sapphireArray == null || fireredArray == null || leafgreenArray == null || emeraldArray == null || colosseumArray == null || xdArray == null) {
                console.log("invalid for db")
            } else {
                let methodSeperation = `<p class="blktxt smolbr">---</p>`
                let rubyMsg = "";
                let sapphireMsg = "";
                let fireredMsg = "";
                let leafgreenMsg = "";
                let emeraldMsg = "";
                let colosseumMsg = "";
                let xdMsg = "";
                pkmnData.ruby.methods.forEach((method, i) => {
                    if (i > 0) rubyMsg = rubyMsg + methodSeperation
                    if (method.status == obtainStatus.obtainable) {
                        rubyMsg = rubyMsg + method.method
                        console.log(rubyMsg)
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
                pkmnData.sapphire.methods.forEach((method, i) => {
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
                pkmnData.firered.methods.forEach((method, i) => {
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
                pkmnData.leafgreen.methods.forEach((method, i) => {
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
                pkmnData.emerald.methods.forEach((method, i) => {
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
                pkmnData.colosseum.methods.forEach((method, i) => {
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
                pkmnData.xd.methods.forEach((method, i) => {
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
                var collapsed = `<h6 class="bigtxt blktxt"><b class="headinglmao">${pkmnData.name}</b><p class="smolbr"></p><b id="eandc">(Click to expand and collapse)</b></h6>`
                var extended = `<h6 class="bigtxt blktxt"><b class="headinglmao">${pkmnData.name}</b><p class="smolbr"></p><p class="smolbr"></p>${ras}<br><p class="smolbr"></p>${fralg}<br><p class="smolbr"></p><b class="emeraldtxt">Pokémon Emerald:</b> ${emeraldMsg}<br><p class="smolbr"></p>${caxd}<br><p class="smolbr"><b id="eandc">(Click to expand and collapse)</b></h6>`
                p.innerHTML = collapsed
                p.style = `cursor: auto;`

                p.onclick = () => {
                    iscollapsed = !iscollapsed
                    if (iscollapsed) p.innerHTML = collapsed
                    if (!iscollapsed) p.innerHTML = extended
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
        } catch(e) {
            console.log(e)
        }
    })

    const br = document.createElement("br")
    const br2 = document.createElement("br")
    databasemenu.append(br)
    databasemenu.append(br2)
   
    boxes.forEach((box, i) => {
        const boxcontainer = document.createElement("div")
        boxcontainer.setAttribute("class", "boxcontainer")
        boxcontainer.setAttribute("id", `box${i+1}container`)
        const boxheader = document.createElement("img")
        const numberedHeadings = settings[2].value
        if (numberedHeadings) boxheader.src = `${baseBoxURL}/header/numbered/box${i+1}.png`
        if (!numberedHeadings) boxheader.src = `${baseBoxURL}/header/standard/box${i+1}.png`
        boxheader.setAttribute("class", "boxheader")
        boxheader.setAttribute("id", `box${i+1}header`)
        boxheader.setAttribute("boxid", `${i+1}`)
        const boxE = document.createElement("div")
        boxE.setAttribute("class", "box")
        boxE.setAttribute("id", `box${i+1}`)
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
                boxE.style = `background-image: url("${baseBoxURL}/body/standard/box${i+1}.png");`
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

                if (pokemon.id > 0) {
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
    });
    document.getElementById("email").onclick = () => { window.location.href = "mailto:nk.personal.work@gmail.com" }
    document.getElementById("home").onclick = () => { window.location.href = "../" }
    document.getElementById("refpls").onclick = () => { window.location.href = "./" }
    document.getElementById("lyras").onclick = () => { window.location.href = "http://i-made-a.website" }
    document.getElementById("bulba").onclick = () => { window.location.href = "https://bulbapedia.bulbagarden.net/wiki/Main_Page" }
    document.getElementById("sereb").onclick = () => { window.location.href = "https://www.serebii.net" }
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").append(document.createElement("br"))
    document.getElementById("trackermenu").style.display = "inline"
    document.getElementById("databasemenu").style.display = "none"
    document.getElementById("optionsmenu").style.display = "none"
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
        const refreshNeed = setting.refresh
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
                console.log(setting["value"])
                if (refreshNeed) document.getElementById("refpls").style.display = "block"
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
                console.log(setting["value"])
                if (refreshNeed) document.getElementById("refpls").style.display = "block"
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