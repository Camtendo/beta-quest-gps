var areas = {
    warp: 'Warp',
    g_:'Grotto',
	castle_front:"Castle (Guards or Ruins)",
	dampe:"Dampe's Grave (And Windmill)",
	trial:"Ganon's Trials Area",
    gt:"Ganon's Tower (After Trials)",
    collapse:"Ganon's Tower Collapse",
	dmc:"Death Moutain Crater",
	dmt:"Death Mountain Trail",
	gc:"Goron City",
	kok:"Kokiri Forest",
	lw:"Lost Woods",
	field:"Hyrule Field",
	kak:"Kakariko Village",
	grave:"Graveyard",
	llr:"Lon Lon Ranch",
    gf:"Gerudo Fortress (Outside)",
    gerudo: "Gerudo Fortress (Inside)",
	gv:"Gerudo Valley",
	gtg:"Gerudo Training Grounds",
	col:"Desert Colossus",
	hw:"Haunted Wasteland",
	lake:"Lake Hylia",
	sfm:"Sacred Forest Meadow",
	zd:"Zora's Domain",
	zf:"Zora's Fountain",
	zr:"Zora's River",
	castle:"Hyrule Castle Child",
	market:"Hyrule Market",
	tot:"Temple of Time",
	stage:'Lost Woods Forest Stage',
	deku:"Deku Tree",
	dc:"Dodongo's Cavern",
	jabu:"Jabu-Jabu's Belly",
	fire:"Fire Temple",
	forest:"Forest Temple",
	water:"Water Temple",
	shadow:"Shadow Temple",
	spirit:"Spirit Temple",
	botw:"Bottom of the Well",
    ic:"Ice Cavern",
};

var warpSongs = {
    warp_songs: 'Warp Songs',
    prelude: 'Prelude of Light',
    minuet: 'Minuet of Forest',
    bolero: 'Bolero of Fire',
    serenade: 'Serenade of Water',
    nocturne: 'Nocturne of Shadow',
    requiem: 'Requiem of Spirit'
};

var bosses = {
    gohma: 'Gohma',
    kd:'King Dodongo',
    barinade: 'Barinade',
    phantom: 'Phantom Ganon',
    volvagia: 'Volvagia',
    morpha: 'Morpha',
    bongo: 'Bongo Bongo',
    twinrova: 'Twinrova',
    ganondorf: 'Great King of Evil Ganondorf',
    ganon: 'Ganon'
};

var requirements = {
    child: 'Child',
    adult: 'Adult',
    bombs: 'Bombs',
    silverscale: 'Silver Scale',
    lullaby: "Zelda's Lullaby",
    saria: "Saria's Song",
    hookshot: 'Hookshot',
    silvergauntlets: 'Silver Gauntlets',
    goldgauntlets: 'Gold Gauntlets',
    sos: 'Song of Storms',
    din: "Din's Fire",
    day: 'Daytime',
    night: 'Nighttime'
};

var allKeys = {...areas, ...warpSongs, ...bosses, ...requirements };
var zoneKeys = {...areas, ...warpSongs, ...bosses};

console.log(allKeys);

function generateGrottoName(key) {
    return `g_${key}`;
}

function generateZone(zoneName) {
    return {
        id: zoneName,
        destination: ''
    }
}

function generateNode(nodeName, zoneNames) {
    return {
        id: nodeName,
        zones: zoneNames.map(z => generateZone(z))
    }
}

function getNode(state, nodeId) {
    var node = state.find(n => {
        return n.id === nodeId;
    });

    return node;
}

function getZone(node, zoneId) {
    var zone = node.zones.find(z => {
        return z.id === zoneId;
    });

    return zone;
}

function generateCurrentLocationSelectData(state) {
    return state.map(n => {
        return {
            id: n.id,
            text: n.id
        };
    });
}

function generateZoneSelectData(zone) {
    var firstOption = {
        id: 'initial',
        text: zone.destination
    };

    return [firstOption].concat(Object.keys(zoneKeys).map(k => {
        return {
            id: zoneKeys[k],
            text: zoneKeys[k]
        }
    }));
}

function setDestination(nodeId, zoneId, destination) {
    var node = getNode(mapState, nodeId);
    var zone = getZone(node, zoneId);
    zone.destination = destination;
}

// All known entrances
var mapState = [
    generateNode(allKeys.field, [
        allKeys.market,
        'zr_land',
        'zr_water',
        allKeys.kak,
        allKeys.lake,
        allKeys.kok,
        allKeys.gv,
        allKeys.llr,
        generateGrottoName('hp10r'),
        generateGrottoName(allKeys.lake),
        generateGrottoName('hp_water'),
        generateGrottoName(allKeys.kok),
        generateGrottoName(allKeys.market),
        generateGrottoName('river'),
        generateGrottoName(allKeys.gv),
        generateGrottoName(allKeys.kak)
    ]),
    generateNode(allKeys.market, [
        'bridge',
        'alley_left',
        'bombchu',
        'alley_right',
        'mask',
        'shop_potion',
        'bazaar',
        allKeys.castle_front,
        allKeys.tot,
        'treasure_game'
    ]),
    generateNode(allKeys.kak, [
        'shop_left',
        'shop_right',
        'house_talon',
        allKeys.grave,
        'house_impa',
        'house_skulltula',
        'windmill',
        generateGrottoName('Redead'),
        generateGrottoName('Potion'),
        'cowjail',
        allKeys.dmt,
        'shop_back',
        'shop_potion',
        allKeys.field,
        allKeys.botw,
    ]),
    generateNode(allKeys.kok, [
        'shop',
        'house_link',
        'house_saria',
        'house_mido',
        'house_twins',
        'house_know_it_all',
        allKeys.lw,
        allKeys.field,
        generateGrottoName(allKeys.kok),
        allKeys.deku,
    ]),
    generateNode(allKeys.gf, [
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        allKeys.gv,
        allKeys.hw,
        allKeys.gtg,
        generateGrottoName(allKeys.gf),
        'caught',
    ]),
    generateNode(allKeys.gv, [
        allKeys.gf,
        allKeys.lake,
        allKeys.field,
        generateGrottoName('tent'),
        generateGrottoName('rock'),
        'tent',
    ]),
    generateNode(allKeys.llr, [
        allKeys.field,
        'door_left',
        'door_right',
        'door_heart_piece',
        'fence_left',
        'fence_middle',
        'fence_right',
        generateGrottoName(allKeys.llr),
    ]),
    generateNode(allKeys.lake, [
        allKeys.field,
        'fishing',
        'owl_ride',
        allKeys.zd,
        allKeys.field,
        allKeys.water,
        'lab',
        allKeys.grave,
    ]),
];

console.log(mapState);

function buildZoneInputs(zones) {
    var $zoneTarget = $('.zone-target');

    zones.forEach(z => {
        var zoneLabel = $(`<div>${z.id}</div>`);
        var newSelect = $(`<select data-zoneId=${z.id} class="zone-select ${z.id}"></select>`);
        $zoneTarget.append(zoneLabel, newSelect);
        newSelect.select2({
            data: generateZoneSelectData(z),
            tags: true,
            width: '100%',
            allowClear: true,
            tokenSeparators: [',', ' '],
            insertTag: function (data, tag) {
                // Insert the tag at the end of the results
                data.push(tag);
            }
        });

        newSelect.on('select2:select', function(e) {
            var newDestinaton = e.params.data.id;
            setDestination(currentNodeId, $(this).data('zoneid'), newDestinaton);

            // Auto navigate to new section
            $('.current-location-select').val(newDestinaton).trigger('change');
            currentNodeId = newDestinaton;
            $('.zone-target').empty();
            var node = getNode(mapState, currentNodeId);
            buildZoneInputs(node.zones);
        });
    });
}

var currentNodeId = null;

$(document).ready(function() {
    var $currentSelect = $('.current-location-select');
    $currentSelect.select2({
        data: generateCurrentLocationSelectData(mapState),
        placeholder: "Select a location",
        width: '100%'
    });

    $currentSelect.on('select2:select', (e) => {
        currentNodeId = e.params.data.id;
        // Purge old stuff first
        $('.zone-target').empty();
        var node = getNode(mapState, currentNodeId);
        buildZoneInputs(node.zones);
    });
});