var areas = {
  castle_front: "Castle (Guards or Ruins)",
  bridge: 'Hyrule Castle Bridge Area',
  dampe: "Dampe's Grave (And Windmill)",
  trial: "Ganon's Trials Area",
  gt: "Ganon's Tower (After Trials)",
  collapse: "Ganon's Tower Collapse",
  dmc: "Death Moutain Crater",
  dmt: "Death Mountain Trail",
  gc: "Goron City",
  kok: "Kokiri Forest",
  lw: "Lost Woods",
  field: "Hyrule Field",
  kak: "Kakariko Village",
  grave: "Graveyard",
  llr: "Lon Lon Ranch",
  gf: "Gerudo Fortress (Outside)",
  thieves: "Thieves' Hideout (Gerudo Fortress Inside)",
  gv: "Gerudo Valley",
  gtg: "Gerudo Training Grounds",
  col: "Desert Colossus",
  hw: "Haunted Wasteland",
  lake: "Lake Hylia",
  sfm: "Sacred Forest Meadow",
  zd: "Zora's Domain",
  zf: "Zora's Fountain",
  zr: "Zora's River",
  castle: "Hyrule Castle Child",
  market: "Hyrule Market",
  alley: "Hyrule Market Alley",
  tot: "Temple of Time",
  stage: 'Lost Woods Forest Stage',
  zelda: "Princess Zelda",
  tot_between: "Between Temple of Time",
  saria_bridge: "Lost Woods Bridge (Saria)"
};

var miscAreas = {
  warp: 'Warp',
  g_: 'Grotto',
  save: "Save Warp",
}

var dungeons = {
  deku: "Deku Tree",
  dc: "Dodongo's Cavern",
  jabu: "Jabu-Jabu's Belly",
  fire: "Fire Temple",
  forest: "Forest Temple",
  water: "Water Temple",
  shadow: "Shadow Temple",
  spirit: "Spirit Temple",
  botw: "Bottom of the Well",
  ic: "Ice Cavern",
}

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
  kd: 'King Dodongo',
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
  bracelet: 'Goron Bracelet',
  silvergauntlets: 'Silver Gauntlets',
  goldgauntlets: 'Gold Gauntlets',
  hammer: 'Megaton Hammer',
  sos: 'Song of Storms',
  time: 'Song of Time',
  din: "Din's Fire",
  day: 'Daytime',
  night: 'Nighttime',
  forest_medallion: 'Forest Medallion',
  fire_medallion: 'Fire Medallion',
  water_medallion: 'Water Medallion',
  shadow_medallion: 'Shadow Medallion',
  spirit_medallion: 'Spirit Medallion',
};

var allKeys = { ...areas, ...miscAreas, ...warpSongs, ...bosses, ...dungeons, ...requirements };
var zoneKeys = { ...areas, ...miscAreas, ...warpSongs, ...dungeons, ...bosses };

console.log(allKeys);

function generateGrottoName(key) {
  return `Grotto: ${key}`;
}

function getSelectGroup(str) {
  if (Object.values(areas).includes(str)) {
    return 'Areas';
  }

  if (Object.values(warpSongs).includes(str)) {
    return 'Warp Songs';
  }

  if (Object.values(bosses).includes(str)) {
    return 'Bosses';
  }

  if (Object.values(dungeons).includes(str)) {
    return 'Dungeons';
  }

  if (Object.values(miscAreas).includes(str)) {
    return 'Misc.';
  }

  if (Object.values(allKeys).includes(str)) {
    return 'Unclassified';
  } 
}

function getAllSelectGroups() {
  return ['Areas', 'Bosses', 'Dungeons', 'Warp Songs', 'Misc.', 'Unclassified'].map(i => {
    return {
      group: i,
    }
  });
}

function createZone(zoneName, prereqs = [], destination = '') {
  return {
    id: zoneName,
    destination: destination || '',
    prereqs: prereqs
  }
}

function generateNode(nodeName, zones = []) {
  return {
    id: nodeName,
    zones: zones
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
      label: n.id,
      group: getSelectGroup(n.id)
    };
  });
}

function generateMasterSelectData() {
  var array = [];
  for (var key of Object.keys(allKeys)) {
    array.push({
      id: allKeys[key], 
      label: allKeys[key],
      group: getSelectGroup(allKeys[key])
    });
  }
  return array;
}

function generateZoneSelectData(zone) {
  var zoneData = Object.keys(zoneKeys).map(k => {
    return {
      id: zoneKeys[k],
      label: zoneKeys[k],
      group: getSelectGroup(zoneKeys[k])
    }
  });

  return zoneData;
}

function getMapSeenPercentage() {
  var seen = 0;
  var total = 0;

  for (node of mapState) {
    for (zone of node.zones) {
      if (zone.destination) {
        seen++;
      }
      total++;
    }
  }

  return seen/total;
}

function setDestination(nodeId, zoneId, destination) {
  var node = getNode(mapState, nodeId);
  var zone = getZone(node, zoneId);
  zone.destination = destination;

  console.log(`${nodeId} via ${zoneId} leads to ${destination}`);
  $('.map-percentage-target').text(`Map seen: ${(100 * getMapSeenPercentage()).toFixed(2)}%`);
}

var mapPercentage = 0;
// All known entrances
var mapState = [
  generateNode(allKeys.field, [
    createZone(allKeys.market),
    createZone(`${allKeys.zr} via land`),
    createZone(`${allKeys.zr} via water`),
    createZone(allKeys.kak),
    createZone(allKeys.lake),
    createZone(allKeys.kok),
    createZone(allKeys.gv),
    createZone(allKeys.llr),
    createZone(generateGrottoName('Heart Piece for 10 Rupees, Hylia Tree'), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.lake)),
    createZone(generateGrottoName('Heart Piece Underwater'), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.kok), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.market), [requirements.bombs]),
    createZone(generateGrottoName('River'), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.gv), [requirements.bombs, requirements.hammer]),
    createZone(generateGrottoName(allKeys.kak), [requirements.bombs])
  ]),
  generateNode(allKeys.market, [
    createZone(allKeys.bridge),
    createZone('Shooting Gallery', [requirements.child, requirements.day]),
    createZone('Alley Left', [requirements.child]),
    createZone('Bombchu Bowling', [requirements.child]),
    createZone('Alley Right', [requirements.child]),
    createZone('Happy Mask Shop', [requirements.child, requirements.day]),
    createZone('Potion Shop', [requirements.child, requirements.day]),
    createZone('Bazaar', [requirements.child, requirements.day]),
    createZone(allKeys.castle_front),
    createZone(allKeys.tot),
    createZone('Treasure Game', [requirements.child, requirements.night])
  ]),
  generateNode(allKeys.kak, [
    createZone('Left Shop (by Death Mountain Trail)', [requirements.adult]),
    createZone('Right Shop (by Death Mountain Trail)'),
    createZone('House: Talon'),
    createZone(allKeys.grave),
    createZone('House: Impa'),
    createZone('House: Skulltulla'),
    createZone('Windmill'),
    createZone(generateGrottoName('Redead'), [requirements.bombs]),
    createZone(generateGrottoName('Potion Shop')),
    createZone('Cow Jail'),
    createZone(allKeys.dmt),
    createZone('Shop back'),
    createZone('Potion Shop'),
    createZone(allKeys.field),
    createZone(allKeys.botw),
    createZone('Shooting Gallery', [requirements.adult])
  ]),
  generateNode(allKeys.kok, [
    createZone('Shop'),
    createZone('House: Link'),
    createZone('House: Saria'),
    createZone('House: Mido'),
    createZone('House: Twins'),
    createZone('House: Know it all Bros'),
    createZone(allKeys.lw),
    createZone(allKeys.field),
    createZone(generateGrottoName(allKeys.kok), [requirements.sos]),
    createZone(allKeys.deku),
  ]),
  generateNode(allKeys.gf, [
    createZone('1f_far_left_B'),
    createZone('1f_middle_left_C'),
    createZone('1f_middle_up_D'),
    createZone('2f_far_right_no_guard_E'),
    createZone('3f_vines_far_right_up_F'),
    createZone('4f_G'),
    createZone('2f_far_right_guard_H'),
    createZone('3f_vines_far_right_right_I'),
    createZone('2f_vines_left_J'),
    createZone('1f_right_K'),
    createZone('3f_solo_L'),
    createZone('2f_far_left_M'),
    createZone('Jail Top'),
    createZone(allKeys.gv),
    createZone(allKeys.hw),
    createZone(allKeys.gtg),
    createZone(generateGrottoName(allKeys.gf), [requirements.sos]),
    createZone('caught'),
  ]),
  generateNode(allKeys.gv, [
    createZone(allKeys.gf),
    createZone(allKeys.lake),
    createZone(allKeys.field),
    createZone(generateGrottoName('Carpenter Tent'),  [requirements.sos]),
    createZone(generateGrottoName('Rock'),  [requirements.goldgauntlets]),
    createZone('Tent',  [requirements.adult]),
    createZone('caught',  [requirements.child]),
  ]),
  generateNode(allKeys.llr, [
    createZone(allKeys.field),
    createZone('door_left'),
    createZone('door_right'),
    createZone('door_heart_piece'),
    createZone('fence_left'),
    createZone('fence_middle'),
    createZone('fence_right'),
    createZone(generateGrottoName(allKeys.llr)),
  ]),
  generateNode(allKeys.lake, [
    createZone(allKeys.field),
    createZone('Fishing Pond'),
    createZone('Owl',  [requirements.child]),
    createZone(allKeys.zd),
    createZone(allKeys.water),
    createZone('Lakeside Laboratory'),
    createZone('Grave hole'),
  ]),
  generateNode(allKeys.gc, [
    createZone(allKeys.dmt),
    createZone('Shop'),
    createZone(allKeys.lw),
    createZone(generateGrottoName(allKeys.gc), [requirements.time]),
    createZone(allKeys.dmc, [requirements.adult]),
  ]),
  generateNode(allKeys.lw, [
    createZone(allKeys.gc),
    createZone(allKeys.kok),
    createZone('Forest Stage Grotto'),
    createZone(allKeys.sfm),
    createZone(allKeys.zr),
    createZone(generateGrottoName(allKeys.gc), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.sfm), [requirements.bombs]),
  ]),
  generateNode(allKeys.bridge, [
    createZone(allKeys.market),
    createZone(allKeys.field),
    createZone('Door'),
  ]),
  generateNode(allKeys.hw, [
    createZone(allKeys.col),
    createZone(allKeys.gf),
    createZone('Quicksand')
  ]),
  generateNode(allKeys.tot, [
    createZone(allKeys.market),
	  createZone('Master Sword'),
  ]),
  generateNode(allKeys.tot_between, [
    createZone(allKeys.market),
	  createZone(allKeys.tot),
  ]),
  generateNode(allKeys.saria_bridge, [
    createZone('Hyrule Field (gossip stone left)'),
	  createZone('Kokiri Forest (gossip stone right)'),
  ]),
  generateNode(allKeys.castle_front, [
    createZone(allKeys.market),
    createZone('Inside Castle (child crawlhole)', [requirements.child]),
    createZone('Inside Castle (Ganon entrance)', [requirements.adult, requirements.shadow_medallion, requirements.spirit_medallion]),
    createZone(generateGrottoName(allKeys.castle_front), [requirements.child, requirements.sos]),
    createZone('Din', [requirements.child, requirements.bombs]),
    createZone('caught', [requirements.child]),
    createZone('Double Defense Fairy', [requirements.adult, requirements.goldgauntlets]),
  ]),
  generateNode(allKeys.castle, [
    createZone(allKeys.zelda),
    createZone('caught'),
	  createZone(allKeys.castle_front),
  ]),
  generateNode(allKeys.zelda, [
    createZone(allKeys.castle_front),
  ]),
  generateNode(allKeys.col, [
    createZone(allKeys.spirit),
    createZone(allKeys.hw),
    createZone('Nayru', [requirements.bombs]),
    createZone(generateGrottoName(allKeys.col), [requirements.goldgauntlets]),
    createZone('Mirror Shield'),
    createZone(requirements.silvergauntlets),
  ]),
  generateNode(allKeys.alley, [
    createZone('market_left'),
    createZone('door_left_up'),
    createZone('market_right'),
    createZone('door_left_left', [requirements.night]),
    createZone('door_right', [requirements.night]),
  ]),
  generateNode(allKeys.grave, [
    createZone(allKeys.dampe),
    createZone('House: Dampe'),
    createZone('Royal Family Tomb (Sun Song)', [requirements.lullaby]),
    createZone('Grave: Heart Piece (Redead)'),
    createZone('Grave: Shield'),
    createZone(allKeys.shadow, [requirements.din]),
    createZone(allKeys.kak),
  ]),
  generateNode(allKeys.sfm, [
    createZone(allKeys.forest),
    createZone(generateGrottoName('Fairy Fountain')),
    createZone(allKeys.lw),
    createZone(generateGrottoName('Wolf'), [requirements.bombs]),
    createZone(generateGrottoName('Saria'), [requirements.sos]),
  ]),
  generateNode(allKeys.trial, [
    createZone(allKeys.gt),
    createZone(allKeys.castle_front),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.zr, [
    createZone('Field via water'),
    createZone('Field via land'),
    createZone(allKeys.zd),
    createZone(generateGrottoName(allKeys.field)),
    createZone(generateGrottoName('Top Rock'), [requirements.bombs]),
    createZone(generateGrottoName('Top No Rock')),
    createZone(allKeys.lw),
  ]),
  generateNode(allKeys.zf, [
    createZone(allKeys.zd),
    createZone(allKeys.ic, [requirements.adult]),
    createZone('Farore', [requirements.bombs]),
    createZone(allKeys.jabu, [requirements.child]),
  ]),
  generateNode(allKeys.zd, [
    createZone('Shop'),
    createZone(allKeys.zf),
    createZone(allKeys.zr),
    createZone(allKeys.lake, [requirements.child, requirements.silverscale]),
    createZone(generateGrottoName(allKeys.zd)),
  ]),
  generateNode(allKeys.dmc, [
    createZone(allKeys.gc),
    createZone(allKeys.fire),
    createZone(allKeys.dmt),
    createZone('Great Fairy', [requirements.hammer]),
    createZone(generateGrottoName(allKeys.dmt), [requirements.bombs]),
    createZone(generateGrottoName('Bridge'), [requirements.hammer]),
  ]),
  generateNode(allKeys.dmt, [
    createZone(allKeys.dmc),
    createZone(allKeys.dc, [requirements.bombs, requirements.bracelet]),
    createZone('Great Fairy', [requirements.bombs]),
    createZone(allKeys.gc),
    createZone(allKeys.kak),
    createZone(generateGrottoName('Cow'), [requirements.bombs]),
    createZone(generateGrottoName(allKeys.gc), [requirements.sos]),
  ]),
  generateNode(allKeys.thieves, [
    createZone('hookshot_ramp_room_top'),
    createZone('hookshot_ramp_room_guards_side'),
    createZone('green_carpenter_room'),
    createZone('one_torch_red_carpenter_jail_right_north_door'),
    createZone('red_carpenter_room_jail_right_south_door'),
    createZone('soup_room_hookshot_away_from_hallway'),
    createZone('soup_room_hookshot_towards_hallway'),
    createZone('soup_room_hallway_near'),
    createZone('soup_room_hallway_far'),
    createZone('two_torch_blue_carpenter_high'),
    createZone('two_torch_blue_carpenter_low'),
    createZone('four_torch_yellow_carpenter_jail_right_north'),
    createZone('four_torch_yellow_carpenter_jail_right_south'),
    createZone('caught'),
  ]),
  generateNode(allKeys.collapse, [
    createZone('A_top_door_A'),
    createZone('A_ganondorf_arena_entrance_A'),
    createZone('B_ganandorf_arena_exit_B'),
    createZone('B_gap_no_climb_top_B'),
    createZone('C_gap_no_climb_bottom_C'),
    createZone('C_lots_rocks_C'),
    createZone('D_lots_rocks_D'),
    createZone('D_normal_spiral_top_D'),
    createZone('E_normal_spiral_bottom_E'),
    createZone('E_stalfos_entrance_E'),
    createZone('F_stalfos_exit_F'),
    createZone('F_climb_gap_top_F'),
    createZone('G_climb_gap_bottom_G'),
    createZone('G_stairs_entrance_G'),
    createZone('H_stairs_exit_H'),
    createZone('I_end_of_game_I', allKeys.ganon)
  ]),
  generateNode(allKeys.dampe, [
    createZone(allKeys.kak),
	  createZone(allKeys.grave),
  ]),
  generateNode(allKeys.deku, [
    createZone(allKeys.gohma),
    createZone(allKeys.kok),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.dc, [
    createZone(allKeys.kd),
    createZone(allKeys.dmt),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.jabu, [
    createZone(allKeys.barinade),
    createZone(allKeys.zf),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.forest, [
    createZone(allKeys.phantom),
    createZone(allKeys.sfm),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.fire, [
    createZone(allKeys.volvagia),
    createZone(allKeys.dmc),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.water, [
    createZone(allKeys.morpha),
    createZone(allKeys.lake),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.shadow, [
    createZone(allKeys.bongo),
    createZone(allKeys.kak),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.spirit, [
    createZone(allKeys.twinrova),
    createZone(allKeys.col),
    createZone('To Silver Gauntlets'),
    createZone('To Mirror Shield'),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.ic, [
    createZone(allKeys.zf),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.botw, [
    createZone(allKeys.kak),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.gt, [
    createZone(allKeys.trial),
    createZone(allKeys.ganondorf),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.gtg, [
    createZone(allKeys.gf),
    createZone(allKeys.save),
  ]),
  generateNode(allKeys.gohma, [
    createZone(allKeys.deku),
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.kok),
  ]),
  generateNode(allKeys.kd, [
    createZone(allKeys.dc),
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.dmt),
  ]),
  generateNode(allKeys.barinade, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.zf),
  ]),
  generateNode(allKeys.phantom, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.sfm),
  ]),
  generateNode(allKeys.volvagia, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.dmc),
  ]),
  generateNode(allKeys.morpha, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.lake),
  ]),
  generateNode(allKeys.bongo, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.grave),
  ]),
  generateNode(allKeys.twinrova, [
    createZone(allKeys.save),
	  createZone(allKeys.warp, [], allKeys.col),
  ]),
  generateNode(allKeys.warp_songs, [
    createZone(allKeys.minuet),
    createZone(allKeys.bolero),
    createZone(allKeys.serenade),
    createZone(allKeys.nocturne, [requirements.forest_medallion, requirements.fire_medallion, requirements.water_medallion]),
    createZone(allKeys.requiem),
    createZone(allKeys.prelude, [requirements.forest_medallion]),
  ]),
];

function buildZoneInputs(zones) {
  var $zoneTarget = $('.zone-target');

  zones = zones.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  zones.forEach((z, index) => {
    var zoneContainer = $('<div class="zone-container col-sm-2"></div>');
    var zoneLabel = !z.destination ? $(`<label for=${index*10}>${z.id}</label>`) : $(`<a href="#">${z.id}</a>`);
    var reqElement = z.prereqs.length ? $(`<div class="zone-requirements">Requires: ${z.prereqs.join(', ')}</div>`) : null;
    var newSelect = $(`<select id=${index*10} data-zoneId=${z.id} class="zone-select ${z.id}"></select>`);
    zoneContainer.append(zoneLabel, reqElement, newSelect);
    $zoneTarget.append(zoneContainer);
    newSelect.selectize( {
      valueField: 'id',
      labelField: 'label',
      searchField: 'label',
      optgroupField: 'group',
      optgroupLabelField: 'group',
      optgroupValueField: 'group',
      optgroups: getAllSelectGroups(),
      options: generateZoneSelectData(z),
      zoneId: z.id,
      placeholder: z.destination,
      hideSelected: true,
      onChange: function (e) {
        var newDestination = e;
        // ZoneId is the same as the label text
        var zoneId = this.settings.zoneId;
        setDestination(currentNodeId, zoneId, newDestination);

        if (!Object.values(zoneKeys).includes(newDestination) || 
            !getNode(mapState, newDestination)) {
          return;
        }
        // Auto navigate to new section
        var currentLocationSelect = $('.current-location-select')[0].selectize;
        currentLocationSelect.setValue(newDestination);
        currentNodeId = newDestination;
        $('.zone-target').empty();
        var node = getNode(mapState, currentNodeId);
        buildZoneInputs(node.zones);
      }
    });
  });

  $('a').click((e) => {
    var zoneId = $(e.target).text();
    var node = getNode(mapState, currentNodeId);
    var zone = getZone(node, zoneId);
    var newDestination = zone.destination;

    if (!Object.values(zoneKeys).includes(newDestination) || 
        !getNode(mapState, newDestination)) {
      return;
    }
    // Auto navigate to new section
    var currentLocationSelect = $('.current-location-select')[0].selectize;
    currentLocationSelect.setValue(newDestination);
    currentNodeId = newDestination;
    $('.zone-target').empty();
    var node = getNode(mapState, currentNodeId);
    buildZoneInputs(node.zones);
  });
}

var currentNodeId = null;

$(document).ready(function () {
  var $currentSelect = $('.current-location-select');
  $currentSelect.selectize({
    valueField: 'id',
    labelField: 'label',
    searchField: 'label',
    optgroupField: 'group',
    optgroupLabelField: 'group',
    optgroupValueField: 'group',
    optgroups: getAllSelectGroups(),
    options: generateCurrentLocationSelectData(mapState),
    onChange: (id) => {
      if (!id) {
        return;
      }
      currentNodeId = id;
      // Purge old stuff first
      $('.zone-target').empty();
      var node = getNode(mapState, currentNodeId);
      buildZoneInputs(node.zones);
    },
    onOpen: (e) => {
      console.log(e);
      console.log(this);
    }
  });

  var $pathStartSelect = $('.path-finder-start');
  $pathStartSelect.selectize({
    valueField: 'id',
    labelField: 'label',
    searchField: 'label',
    optgroupField: 'group',
    optgroupLabelField: 'group',
    optgroupValueField: 'group',
    optgroups: getAllSelectGroups(),
    options: generateMasterSelectData(),
  });

  var $pathEndSelect = $('.path-finder-end');
  $pathEndSelect.selectize({
    valueField: 'id',
    labelField: 'label',
    searchField: 'label',
    optgroupField: 'group',
    optgroupLabelField: 'group',
    optgroupValueField: 'group',
    optgroups: getAllSelectGroups(),
    options: generateMasterSelectData(),
  });
});

function writeMapState() {
  console.log(mapState);
}

function loadMapState(newState) {
  mapState = newState;
}