var areas = {
  warp: 'Warp',
  g_: 'Grotto',
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
  tot: "Temple of Time",
  stage: 'Lost Woods Forest Stage',
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
  silvergauntlets: 'Silver Gauntlets',
  goldgauntlets: 'Gold Gauntlets',
  sos: 'Song of Storms',
  din: "Din's Fire",
  day: 'Daytime',
  night: 'Nighttime'
};

var allKeys = { ...areas, ...warpSongs, ...bosses, ...requirements };
var zoneKeys = { ...areas, ...warpSongs, ...bosses };

console.log(allKeys);

function generateGrottoName(key) {
  return `Grotto: ${key}`;
}

function createZone(zoneName, destination = '', prereqs = []) {
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
    createZone(allKeys.market),
    createZone(`${allKeys.zr} via land`),
    createZone(`${allKeys.zr} via water`),
    createZone(allKeys.kak),
    createZone(allKeys.lake),
    createZone(allKeys.kok),
    createZone(allKeys.gv),
    createZone(allKeys.llr),
    createZone(generateGrottoName('hp10r')),
    createZone(generateGrottoName(allKeys.lake)),
    createZone(generateGrottoName('hp_water')),
    createZone(generateGrottoName(allKeys.kok)),
    createZone(generateGrottoName(allKeys.market)),
    createZone(generateGrottoName('river')),
    createZone(generateGrottoName(allKeys.gv)),
    createZone(generateGrottoName(allKeys.kak))
  ]),
  generateNode(allKeys.market, [
    createZone(allKeys.bridge),
    createZone('Alley Left'),
    createZone('Bombchu Bowling'),
    createZone('Alley Right'),
    createZone('Happy Mask Shop'),
    createZone('Potion Shop'),
    createZone('Bazaar'),
    createZone(allKeys.castle_front),
    createZone(allKeys.tot),
    createZone('Treasure Game')
  ]),
  generateNode(allKeys.kak, [
    createZone('shop_left'),
    createZone('shop_right'),
    createZone('house_talon'),
    createZone(allKeys.grave),
    createZone('house_impa'),
    createZone('house_skulltula'),
    createZone('windmill'),
    createZone(generateGrottoName('Redead')),
    createZone(generateGrottoName('Potion')),
    createZone('cowjail'),
    createZone(allKeys.dmt),
    createZone('shop_back'),
    createZone('shop_potion'),
    createZone(allKeys.field),
    createZone(allKeys.botw),
  ]),
  generateNode(allKeys.kok, [
    createZone('shop'),
    createZone('house_link'),
    createZone('house_saria'),
    createZone('house_mido'),
    createZone('house_twins'),
    createZone('house_know_it_all'),
    createZone(allKeys.lw),
    createZone(allKeys.field),
    createZone(generateGrottoName(allKeys.kok)),
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
    createZone('jail_top'),
    createZone(allKeys.gv),
    createZone(allKeys.hw),
    createZone(allKeys.gtg),
    createZone(generateGrottoName(allKeys.gf)),
    createZone('caught'),
  ]),
  generateNode(allKeys.gv, [
    createZone(allKeys.gf),
    createZone(allKeys.lake),
    createZone(allKeys.field),
    createZone(generateGrottoName('tent')),
    createZone(generateGrottoName('rock')),
    createZone('tent'),
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
    createZone('fishing'),
    createZone('owl_ride'),
    createZone(allKeys.zd),
    createZone(allKeys.field),
    createZone(allKeys.water),
    createZone('lab'),
    createZone(allKeys.grave),
  ]),
  generateNode(allKeys.gc, [
    createZone(allKeys.dmt),
    createZone('shop'),
    createZone(allKeys.lw),
    createZone(generateGrottoName(allKeys.gc)),
    createZone(allKeys.dmc),
  ]),
  generateNode(allKeys.lw, [
    createZone(allKeys.gc),
    createZone(allKeys.kok),
    createZone('stage'),
    createZone(allKeys.sfm),
    createZone(allKeys.zr),
    createZone(generateGrottoName(allKeys.gc)),
    createZone(generateGrottoName(allKeys.sfm)),
  ]),
  generateNode(allKeys.bridge, [
    createZone(allKeys.market),
    createZone(allKeys.field),
    createZone('door'),
  ]),
  generateNode(allKeys.hw, [
    createZone(allKeys.col),
	  createZone(allKeys.gf),
  ]),
  generateNode(allKeys.tot, [
    createZone(allKeys.market),
	  createZone('master_sword'),
  ]),
  generateNode(allKeys.castle_front, [
    createZone(allKeys.market),
    createZone('castle_child'),
    createZone('castle_ganon'),
    createZone(generateGrottoName(allKeys.castle_front)),
    createZone('din'),
    createZone('caught_guard'),
    createZone('Double Defense Fairy'),
  ]),
  generateNode(allKeys.castle, [
    createZone('Princess Zelda'),
    createZone('caught'),
	  createZone(allKeys.castle_front),
  ]),
  generateNode('Princess Zelda', [
    createZone(allKeys.castle_front),
  ]),
  generateNode(allKeys.col, [
    createZone(allKeys.spirit),
    createZone(allKeys.hw),
    createZone('naryu'),
    createZone(generateGrottoName(allKeys.col)),
    createZone('mirror_shield'),
    createZone(requirements.silvergauntlets),
  ]),
  generateNode(allKeys.alley, [
    createZone('market_left'),
    createZone('door_left_up'),
    createZone('market_right'),
    createZone('door_left_left'),
    createZone('door_right'),
  ]),
  generateNode(allKeys.grave, [
    createZone(allKeys.dampe),
    createZone('house_dampe'),
    createZone('sun_song'),
    createZone('grave_heart_piece'),
    createZone('grave_shield'),
    createZone(allKeys.shadow),
    createZone(allKeys.kak),
  ]),
  generateNode(allKeys.sfm, [
    createZone(allKeys.forest),
    createZone(generateGrottoName('Fairy Fountain')),
    createZone(allKeys.lw),
    createZone(generateGrottoName('wolf')),
    createZone(generateGrottoName('saria')),
  ]),
  generateNode(allKeys.trial, [
    createZone(allKeys.gt),
	  createZone(allKeys.castle_front),
  ]),
  generateNode(allKeys.zr, [
    createZone('field_water'),
    createZone('field_land'),
    createZone(allKeys.zd),
    createZone(generateGrottoName(allKeys.field)),
    createZone(generateGrottoName('top_rock')),
    createZone(generateGrottoName('top_no_rock')),
    createZone(allKeys.lw),
  ]),
  generateNode(allKeys.zf, [
    createZone(allKeys.zd),
    createZone(allKeys.ic),
    createZone('farore'),
    createZone(allKeys.jabu),
  ]),
  generateNode(allKeys.zd, [
    createZone('shop'),
    createZone(allKeys.zf),
    createZone(allKeys.zr),
    createZone(allKeys.lake),
    createZone(generateGrottoName(allKeys.zd)),
  ]),
  generateNode(allKeys.dmc, [
    createZone(allKeys.gc),
    createZone(allKeys.fire),
    createZone(allKeys.dmt),
    createZone('great_fairy'),
    createZone(generateGrottoName(allKeys.dmt)),
    createZone(generateGrottoName('bridge')),
  ]),
  generateNode(allKeys.dmt, [
    createZone(allKeys.dmc),
    createZone(allKeys.dc),
    createZone('great_fairy'),
    createZone(allKeys.gc),
    createZone(allKeys.kak),
    createZone(generateGrottoName('cow')),
    createZone(generateGrottoName(allKeys.gc)),
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
  ]),
  generateNode(allKeys.collapse, [
    createZone('top_door_A'),
    createZone('ganondorf_arena_entrance_A'),
    createZone('ganandorf_arena_exit_B'),
    createZone('gap_no_climb_top_B'),
    createZone('gap_no_climb_bottom_C'),
    createZone('lots_rocks_C'),
    createZone('lots_rocks_D'),
    createZone('normal_spiral_top_D'),
    createZone('normal_spiral_top_E'),
    createZone('stalfos_entrance_E'),
    createZone('stalfos_exit_F'),
    createZone('climb_gap_top_F'),
    createZone('climb_gap_bottom_G'),
    createZone('stairs_entrance_G'),
    createZone('stairs_exit_H'),
    createZone('end_of_game_I', allKeys.ganon)
  ]),
  generateNode(allKeys.dampe, [
    createZone(allKeys.kak),
	  createZone(allKeys.grave),
  ]),
  generateNode(allKeys.deku, [
    createZone(allKeys.gohma),
	  createZone(allKeys.kok),
  ]),
  generateNode(allKeys.dc, [
    createZone(allKeys.kd),
	  createZone(allKeys.dmt),
  ]),
  generateNode(allKeys.jabu, [
    createZone(allKeys.barinade),
	  createZone(allKeys.zf),
  ]),
  generateNode(allKeys.forest, [
    createZone(allKeys.phantom),
	  createZone(allKeys.sfm),
  ]),
  generateNode(allKeys.fire, [
    createZone(allKeys.volvagia),
	  createZone(allKeys.dmc),
  ]),
  generateNode(allKeys.water, [
    createZone(allKeys.morpha),
	  createZone(allKeys.lake),
  ]),
  generateNode(allKeys.shadow, [
    createZone(allKeys.bongo),
	  createZone(allKeys.kak),
  ]),
  generateNode(allKeys.spirit, [
    createZone(allKeys.twinrova),
    createZone(allKeys.col),
    createZone('col_silver'),
	  createZone('col_mirror'),
  ]),
  generateNode(allKeys.ic, [
    createZone(allKeys.zf),
  ]),
  generateNode(allKeys.botw, [
    createZone(allKeys.kak),
  ]),
  generateNode(allKeys.gt, [
    createZone(allKeys.trial),
	  createZone(allKeys.ganondorf),
  ]),
  generateNode(allKeys.gtg, [
    createZone(allKeys.gf),
  ]),
  generateNode(allKeys.gohma, [
    createZone(allKeys.deku),
	  createZone(allKeys.warp, allKeys.kok),
  ]),
  generateNode(allKeys.kd, [
    createZone(allKeys.dc),
	  createZone(allKeys.warp, allKeys.dmt),
  ]),
  generateNode(allKeys.barinade, [
	  createZone(allKeys.warp, allKeys.zf),
  ]),
  generateNode(allKeys.phantom, [
	  createZone(allKeys.warp, allKeys.sfm),
  ]),
  generateNode(allKeys.volvagia, [
	  createZone(allKeys.warp, allKeys.dmc),
  ]),
  generateNode(allKeys.morpha, [
	  createZone(allKeys.warp, allKeys.lake),
  ]),
  generateNode(allKeys.bongo, [
	  createZone(allKeys.warp, allKeys.grave),
  ]),
  generateNode(allKeys.twinrova, [
	  createZone(allKeys.warp, allKeys.col),
  ]),
  generateNode(allKeys.warp_songs, [
    createZone(allKeys.minuet),
    createZone(allKeys.bolero),
    createZone(allKeys.serenade),
    createZone(allKeys.nocturne),
    createZone(allKeys.requiem),
    createZone(allKeys.prelude),
  ]),
];

function buildZoneInputs(zones) {
  var $zoneTarget = $('.zone-target');

 zones.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  zones.forEach((z, index) => {
    // Multiple by 10 so that select2 doesn't change the current-location select by accident
    // Dumb AF
    var zoneContainer = $('<div class="zone-container col-sm-3"></div>');
    var zoneLabel = $(`<label for=${index*10}>${z.id}</div>`);
    var newSelect = $(`<select id=${index*10} data-zoneId=${z.id} class="zone-select ${z.id}"></select>`);
    zoneContainer.append(zoneLabel, newSelect);
    $zoneTarget.append(zoneContainer);
    newSelect.select2({
      data: generateZoneSelectData(z),
      tags: false,
      width: '100%',
      allowClear: true,
      tokenSeparators: [',', ' '],
    });

    newSelect.on('select2:select', function (e) {
      var newDestination = e.params.data.id;
      // ZoneId is the same as the label text
      var zoneId = $(`label[for=${this.id}]`).text();
      if (!Object.values(zoneKeys).includes(newDestination) || 
          !getNode(mapState, newDestination)) {
        return;
      }

      setDestination(currentNodeId, zoneId, newDestination);
      // Auto navigate to new section
      $('.current-location-select').val(newDestination).trigger('change');
      currentNodeId = newDestination;
      $('.zone-target').empty();
      var node = getNode(mapState, currentNodeId);
      buildZoneInputs(node.zones);
    });
  });
}

var currentNodeId = null;

$(document).ready(function () {
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

  var $pathStartSelect = $('.path-finder-start');
  $pathStartSelect.select2({
    data: generateCurrentLocationSelectData(mapState),
    placeholder: "Select a location",
    width: '100%'
  });

  var $pathEndSelect = $('.path-finder-end');
  $pathEndSelect.select2({
    data: generateCurrentLocationSelectData(mapState),
    placeholder: "Select a location",
    width: '100%'
  });
});

function writeMapState() {
  console.log(mapState);
}

function loadMapState(newState) {
  mapState = newState;
}