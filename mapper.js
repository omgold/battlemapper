var pick_mode = 0;
var config = {}
var next_char_id = 0;
var next_effect_id = 0;

var effect_types = {
    s5: { img: "area-5ft-radius.png", text: "5 ft", sx: 1, sy: 1 },
    r5: { img: "area-5ft-radius.png", text: "5 ft", sx: 2, sy: 2 },
    r10: { img: "area-10ft-radius.png", text: "10 ft", sx: 4, sy: 4 },
    r20: { img: "area-20ft-radius.png", text: "20 ft", sx: 8, sy: 8 },
    r40: { img: "area-40ft-radius.png", text: "40 ft", sx: 16, sy: 16 },
    r80: { img: "area-80ft-radius.png", text: "80 ft", sx: 32, sy: 32 },
    c15n: { img: "area-15ft-n-cone.png", text: "to north", sx: 3, sy: 3 },
    c15e: { img: "area-15ft-e-cone.png", text: "to east", sx: 3, sy: 3 },
    c15s: { img: "area-15ft-s-cone.png", text: "to south", sx: 3, sy: 3 },
    c15w: { img: "area-15ft-w-cone.png", text: "to west", sx: 3, sy: 3 },
    c15nalt: { img: "area-15ft-n-cone-alt.png", text: "to north (alternative)", sx: 4, sy: 3 },
    c15ealt: { img: "area-15ft-e-cone-alt.png", text: "to east (alternative)", sx: 3, sy: 4 },
    c15salt: { img: "area-15ft-s-cone-alt.png", text: "to south (alternative)", sx: 4, sy: 3 },
    c15walt: { img: "area-15ft-w-cone-alt.png", text: "to west (alternative)", sx: 3, sy: 4 },
    c15ne: { img: "area-15ft-ne-cone.png", text: "to north-east", sx: 3, sy: 3 },
    c15se: { img: "area-15ft-se-cone.png", text: "to south-east", sx: 3, sy: 3 },
    c15sw: { img: "area-15ft-sw-cone.png", text: "to south-west", sx: 3, sy: 3 },
    c15nw: { img: "area-15ft-nw-cone.png", text: "to north-west", sx: 3, sy: 3 },
    c15nealt: { img: "area-15ft-ne-cone-alt.png", text: "to north-east (alternative)", sx: 3, sy: 3 },
    c15sealt: { img: "area-15ft-se-cone-alt.png", text: "to south-east (alternative)", sx: 3, sy: 3 },
    c15swalt: { img: "area-15ft-sw-cone-alt.png", text: "to south-west (alternative)", sx: 3, sy: 3 },
    c15nwalt: { img: "area-15ft-nw-cone-alt.png", text: "to north-west (alternative)", sx: 3, sy: 3 },
    c20n: { img: "area-20ft-n-cone.png", text: "to north", sx: 6, sy: 4 },
    c20e: { img: "area-20ft-e-cone.png", text: "to east", sx: 4, sy: 6 },
    c20s: { img: "area-20ft-s-cone.png", text: "to south", sx: 6, sy: 4 },
    c20w: { img: "area-20ft-w-cone.png", text: "to west", sx: 4, sy: 6 },
    c20ne: { img: "area-20ft-ne-cone.png", text: "to north-east", sx: 4, sy: 4 },
    c20se: { img: "area-20ft-se-cone.png", text: "to south-east", sx: 4, sy: 4 },
    c20sw: { img: "area-20ft-sw-cone.png", text: "to south-west", sx: 4, sy: 4 },
    c20nw: { img: "area-20ft-nw-cone.png", text: "to north-west", sx: 4, sy: 4 },
    c30n: { img: "area-30ft-n-cone.png", text: "to north", sx: 8, sy: 6 },
    c30e: { img: "area-30ft-e-cone.png", text: "to east", sx: 6, sy: 8 },
    c30s: { img: "area-30ft-s-cone.png", text: "to south", sx: 8, sy: 6 },
    c30w: { img: "area-30ft-w-cone.png", text: "to west", sx: 6, sy: 8 },
    c30ne: { img: "area-30ft-ne-cone.png", text: "to north-east", sx: 6, sy: 6 },
    c30se: { img: "area-30ft-se-cone.png", text: "to south-east", sx: 6, sy: 6 },
    c30sw: { img: "area-30ft-sw-cone.png", text: "to south-west", sx: 6, sy: 6 },
    c30nw: { img: "area-30ft-nw-cone.png", text: "to north-west", sx: 6, sy: 6 },
    c30nealt: { img: "area-30ft-ne-cone-alt.png", text: "to north-east (alternative)", sx: 6, sy: 6 },
    c30sealt: { img: "area-30ft-se-cone-alt.png", text: "to south-east (alternative)", sx: 6, sy: 6 },
    c30swalt: { img: "area-30ft-sw-cone-alt.png", text: "to south-west (alternative)", sx: 6, sy: 6 },
    c30nwalt: { img: "area-30ft-nw-cone-alt.png", text: "to north-west (alternative)", sx: 6, sy: 6 },
    c40n: { img: "area-40ft-n-cone.png", text: "to north", sx: 10, sy: 8 },
    c40e: { img: "area-40ft-e-cone.png", text: "to east", sx: 8, sy: 10 },
    c40s: { img: "area-40ft-s-cone.png", text: "to south", sx: 10, sy: 8 },
    c40w: { img: "area-40ft-w-cone.png", text: "to west", sx: 8, sy: 10 },
    c40ne: { img: "area-40ft-ne-cone.png", text: "to north-east", sx: 8, sy: 8 },
    c40se: { img: "area-40ft-se-cone.png", text: "to south-east", sx: 8, sy: 8 },
    c40sw: { img: "area-40ft-sw-cone.png", text: "to south-west", sx: 8, sy: 8 },
    c40nw: { img: "area-40ft-nw-cone.png", text: "to north-west", sx: 8, sy: 8 },
    c50n: { img: "area-50ft-n-cone.png", text: "to north", sx: 14, sy: 10 },
    c50e: { img: "area-50ft-e-cone.png", text: "to east", sx: 10, sy: 14 },
    c50s: { img: "area-50ft-s-cone.png", text: "to south", sx: 14, sy: 10 },
    c50w: { img: "area-50ft-w-cone.png", text: "to west", sx: 10, sy: 14 },
    c50ne: { img: "area-50ft-ne-cone.png", text: "to north-east", sx: 10, sy: 10 },
    c50se: { img: "area-50ft-se-cone.png", text: "to south-east", sx: 10, sy: 10 },
    c50sw: { img: "area-50ft-sw-cone.png", text: "to south-west", sx: 10, sy: 10 },
    c50nw: { img: "area-50ft-nw-cone.png", text: "to north-west", sx: 10, sy: 10 },
    c60n: { img: "area-60ft-n-cone.png", text: "to north", sx: 16, sy: 12 },
    c60e: { img: "area-60ft-e-cone.png", text: "to east", sx: 12, sy: 16 },
    c60s: { img: "area-60ft-s-cone.png", text: "to south", sx: 16, sy: 12 },
    c60w: { img: "area-60ft-w-cone.png", text: "to west", sx: 12, sy: 16 },
    c60ne: { img: "area-60ft-ne-cone.png", text: "to north-east", sx: 12, sy: 12 },
    c60se: { img: "area-60ft-se-cone.png", text: "to south-east", sx: 12, sy: 12 },
    c60sw: { img: "area-60ft-sw-cone.png", text: "to south-west", sx: 12, sy: 12 },
    c60nw: { img: "area-60ft-nw-cone.png", text: "to north-west", sx: 12, sy: 12 },
    c60nealt: { img: "area-60ft-ne-cone-alt.png", text: "to north-east (alternative)", sx: 12, sy: 12 },
    c60sealt: { img: "area-60ft-se-cone-alt.png", text: "to south-east (alternative)", sx: 12, sy: 12 },
    c60swalt: { img: "area-60ft-sw-cone-alt.png", text: "to south-west (alternative)", sx: 12, sy: 12 },
    c60nwalt: { img: "area-60ft-nw-cone-alt.png", text: "to north-west (alternative)", sx: 12, sy: 12 },
    c70n: { img: "area-70ft-n-cone.png", text: "to north", sx: 18, sy: 14 },
    c70e: { img: "area-70ft-e-cone.png", text: "to east", sx: 14, sy: 18 },
    c70s: { img: "area-70ft-s-cone.png", text: "to south", sx: 18, sy: 14 },
    c70w: { img: "area-70ft-w-cone.png", text: "to west", sx: 14, sy: 18 },
    c70ne: { img: "area-70ft-ne-cone.png", text: "to north-east", sx: 14, sy: 14 },
    c70se: { img: "area-70ft-se-cone.png", text: "to south-east", sx: 14, sy: 14 },
    c70sw: { img: "area-70ft-sw-cone.png", text: "to south-west", sx: 14, sy: 14 },
    c70nw: { img: "area-70ft-nw-cone.png", text: "to north-west", sx: 14, sy: 14 },
    c80n: { img: "area-80ft-n-cone.png", text: "to north", sx: 22, sy: 16 },
    c80e: { img: "area-80ft-e-cone.png", text: "to east", sx: 16, sy: 22 },
    c80s: { img: "area-80ft-s-cone.png", text: "to south", sx: 22, sy: 16 },
    c80w: { img: "area-80ft-w-cone.png", text: "to west", sx: 6, sy: 22 },
    c80ne: { img: "area-80ft-ne-cone.png", text: "to north-east", sx: 16, sy: 16 },
    c80se: { img: "area-80ft-se-cone.png", text: "to south-east", sx: 16, sy: 16 },
    c80sw: { img: "area-80ft-sw-cone.png", text: "to south-west", sx: 16, sy: 16 },
    c80nw: { img: "area-80ft-nw-cone.png", text: "to north-west", sx: 16, sy: 16 },
    c120n: { img: "area-120ft-n-cone.png", text: "to north", sx: 32, sy: 24 },
    c120e: { img: "area-120ft-e-cone.png", text: "to east", sx: 24, sy: 32 },
    c120s: { img: "area-120ft-s-cone.png", text: "to south", sx: 32, sy: 6 },
    c120w: { img: "area-120ft-w-cone.png", text: "to west", sx: 24, sy: 32 },
    c120ne: { img: "area-120ft-ne-cone.png", text: "to north-east", sx: 24, sy: 24 },
    c120se: { img: "area-120ft-se-cone.png", text: "to south-east", sx: 24, sy: 24 },
    c120sw: { img: "area-120ft-sw-cone.png", text: "to south-west", sx: 24, sy: 24 },
    c120nw: { img: "area-120ft-nw-cone.png", text: "to north-west", sx: 24, sy: 24 },
    l30ns: { img: "area-30ft-ns-line.png", text: "north-south", sx: 1, sy: 6 },
    l30ne15: { img: "area-30ft-ne15-line.png", text: "to north-east (15 deg)", sx: 2, sy: 6 },
    l30ne30: { img: "area-30ft-ne30-line.png", text: "to north-east (30 deg)", sx: 3, sy: 5 },
    l30ne45: { img: "area-30ft-ne45-line.png", text: "to north-east (45 deg)", sx: 4, sy: 4 },
    l30en30: { img: "area-30ft-en30-line.png", text: "to east-north (30 deg)", sx: 5, sy: 3 },
    l30en15: { img: "area-30ft-en15-line.png", text: "to east-north (15 deg)", sx: 6, sy: 2 },
    l30ew: { img: "area-30ft-ns-line.png", text: "east-west", sx: 6, sy: 1 },
    l30es15: { img: "area-30ft-es15-line.png", text: "to east-south (15 deg)", sx: 6, sy: 2 },
    l30es30: { img: "area-30ft-es30-line.png", text: "to east-south (30 deg)", sx: 5, sy: 3 },
    l30se45: { img: "area-30ft-se45-line.png", text: "to south-east (45 deg)", sx: 4, sy: 4 },
    l30se30: { img: "area-30ft-se30-line.png", text: "to south-east (30 deg)", sx: 3, sy: 5 },
    l30se15: { img: "area-30ft-se15-line.png", text: "to south-east (15 deg)", sx: 2, sy: 6 }
}

var effect_type_groups = {
    "Square": [ "s5" ],
    "Radius": [ "r5", "r10", "r20", "r40", "r80" ],
    "Cone 15ft": [ "c15n", "c15ne", "c15e", "c15se", "c15s", "c15sw", "c15w", "c15nw", "c15nalt", "c15nealt", "c15ealt", "c15sealt", "c15salt", "c15swalt", "c15walt", "c15nwalt" ],
    "Cone 20ft": [ "c20n", "c20ne", "c20e", "c20se", "c20s", "c20sw", "c20w", "c20nw" ],
    "Cone 30ft": [ "c30n", "c30ne", "c30e", "c30se", "c30s", "c30sw", "c30w", "c30nw", "c30nealt", "c30sealt", "c30swalt", "c30nwalt" ],
    "Cone 40ft": [ "c40n", "c40ne", "c40e", "c40se", "c40s", "c40sw", "c40w", "c40nw" ],
    "Cone 50ft": [ "c50n", "c50ne", "c50e", "c50se", "c50s", "c50sw", "c50w", "c50nw" ],
    "Cone 60ft": [ "c60n", "c60ne", "c60e", "c60se", "c60s", "c60sw", "c60w", "c60nw", "c60nealt", "c60sealt", "c60swalt", "c60nwalt" ],
    "Cone 70ft": [ "c70n", "c70ne", "c70e", "c70se", "c70s", "c70sw", "c70w", "c70nw" ],
    "Cone 80ft": [ "c80n", "c80ne", "c80e", "c80se", "c80s", "c80sw", "c80w", "c80nw" ],
    "Cone 120ft": [ "c120n", "c120ne", "c120e", "c120se", "c120s", "c120sw", "c120w", "c120nw" ],
    "Line 30ft": [ "l30ns", "l30ne15", "l30ne30", "l30ne45", "l30en30", "l30en15", "l30ew", "l30es15", "l30es30", "l30se45", "l30se30", "l30se15" ]
}

var effect_colors = {
    red: { text: "red", angle: 0 },
    yellow: { text: "yellow", angle: 60 },
    green: { text: "green", angle: 120 },
    cyan: { text: "cyan", angle: 180 },
    blue: { text: "blue", angle: 240 },
    purple: { text: "purple", angle: 300 }
}

var last_touch_start_event = null;
var last_drag_start_event = null;

function startDrag( event ) {
    event.dataTransfer.setData( "text", event.target.id );
    last_drag_start_event = event;
}

function startTouch( event ) {
    last_touch_start_event = event.changedTouches[0];
}

function allowDrop( event ) {
    event.preventDefault();
}

function placeChar( id )
{
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var char = document.getElementById( "creature-img2-"+id );
    var char_config = config.creatures[id];
    var char_width = char.width;
    var char_height = char.height;
    var size = config.creatures[id].size;
    if ( size == undefined )
        size = 1;
    var rect = map.getBoundingClientRect();
    var left = Math.min( config.x1, config.x2 );
    var top = Math.min( config.y1, config.y2 );
    var offset_x = ( gridsize_x * map_width * size - char_width ) / 2;
    var offset_y = ( gridsize_y * map_height * size - char_height ) / 2;
    char.style.left = ( char_config.x * gridsize_x + left ) * map_width + offset_x + "px";
    char.style.top = ( char_config.y * gridsize_y + top ) * map_height + offset_y + "px";
    char.width = char.width;
}

function placeEffect( id )
{
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var effect = document.getElementById( "effect-img-"+id );
    var effect_config = config.effects[id];
    var rect = map.getBoundingClientRect();
    var left = Math.min( config.x1, config.x2 );
    var top = Math.min( config.y1, config.y2 );
    effect.style.left = ( effect_config.x * gridsize_x + left ) * map_width + "px";
    effect.style.top = ( effect_config.y * gridsize_y + top ) * map_height + "px";
    effect.width = effect.width;
}

function dropOnImage( event ) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");
    if ( id.search( /^creature-img2-/ ) != -1 )
    {
        var char = document.getElementById( id );
        var char_config = config.creatures[char.name];
        var map = document.getElementById("map");
        var map_width = map.width;
        var map_height = map.height;
        var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
        var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
        var rect = map.getBoundingClientRect();
        var left = Math.min( config.x1, config.x2 );
        var top = Math.min( config.y1, config.y2 );
        var old_x = ( last_drag_start_event.clientX - rect.left ) / map_width - left;
        var old_y = ( last_drag_start_event.clientY - rect.top ) / map_height - top;
        var new_x = ( event.clientX - rect.left ) / map_width - left;
        var new_y = ( event.clientY - rect.top ) / map_height - top;
        var old_sq_x = Math.round( old_x/gridsize_x - 0.5 );
        var old_sq_y = Math.round( old_y/gridsize_y - 0.5 );
        var new_sq_x = Math.round( new_x/gridsize_x - 0.5 );
        var new_sq_y = Math.round( new_y/gridsize_y - 0.5 );
        char_config.x += new_sq_x - old_sq_x;
        char_config.y += new_sq_y - old_sq_y;
        placeChar( char.name );
        saveConfig();
    } else if ( id.search( /^effect-img-/ ) != -1 ) {
        var effect = document.getElementById( id );
        var effect_config = config.effects[effect.name];
        var map = document.getElementById("map");
        var map_width = map.width;
        var map_height = map.height;
        var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
        var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
        var rect = map.getBoundingClientRect();
        var left = Math.min( config.x1, config.x2 );
        var top = Math.min( config.y1, config.y2 );
        var old_x = ( last_drag_start_event.clientX - rect.left ) / map_width - left;
        var old_y = ( last_drag_start_event.clientY - rect.top ) / map_height - top;
        var new_x = ( event.clientX - rect.left ) / map_width - left;
        var new_y = ( event.clientY - rect.top ) / map_height - top;
        var old_sq_x = Math.round( old_x/gridsize_x - 0.5 );
        var old_sq_y = Math.round( old_y/gridsize_y - 0.5 );
        var new_sq_x = Math.round( new_x/gridsize_x - 0.5 );
        var new_sq_y = Math.round( new_y/gridsize_y - 0.5 );
        effect_config.x += new_sq_x - old_sq_x;
        effect_config.y += new_sq_y - old_sq_y;
        placeEffect( effect.name );
        saveConfig();
    } else {
        var url = document.getElementById("url");
        url.value = id;
        var url = event.dataTransfer.getData("text");
        doSetImage();
    }
}

function endTouch( event ) {
    var touch_start = last_touch_start_event;
    var touch_end = event.changedTouches[0];
    var char = event.target;
    var char_config = config.creatures[char.name];
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var dx = ( touch_end.clientX - touch_start.clientX ) / map_width;
    var dy = ( touch_end.clientY - touch_start.clientY ) / map_height;
    char_config.x += Math.round( dx/gridsize_x );
    char_config.y += Math.round( dy/gridsize_y );
    placeChar( char.name );
    saveConfig();
}

function endTouchEffect( event ) {
    var touch_start = last_touch_start_event;
    var touch_end = event.changedTouches[0];
    var effect = event.target;
    var effect_config = config.effects[effect.name];
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var dx = ( touch_end.clientX - touch_start.clientX ) / map_width;
    var dy = ( touch_end.clientY - touch_start.clientY ) / map_height;
    effect_config.x += Math.round( dx/gridsize_x );
    effect_config.y += Math.round( dy/gridsize_y );
    placeEffect( effect.name );
    saveConfig();
}

function dropOnUrl( event ) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");
    var url = document.getElementById("url");
    url.value = id;
    doSetImage();
}

function dropOnCharUrl( event ) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");
    var url = event.target;
    url.value = id;
    doSetCharImage( url.parentElement.name );
}

function dropOnCharImg( event ) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");
    var url = document.getElementById( "creature-url-"+ event.target.parentElement.parentElement.name );
    url.value = id;
    doSetCharImage( url.parentElement.name );
}

function adjustFrame() {
    var map = document.getElementById("map");
    var scale = document.getElementById( "scale" );
    if ( scale.value == "" ) {
        scale.value = 100;
        map.width = map.naturalWidth;
    } else {
        map.width = map.naturalWidth * scale.value / 100;
    }
    map.style.top = "0px";
    adjustGrid();
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
    }
}

function adjustGrid() {
    var scale = document.getElementById( "scale" );
    var map_width = map.naturalWidth * scale.value / 100;
    var map_height = map.naturalHeight * scale.value / 100;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) * map_width / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) * map_height / config.gy;
    var left = Math.min( config.x1, config.x2 ) * map_width;
    var top = Math.min( config.y1, config.y2 ) * map_height;
    var right = Math.max( config.x1, config.x2 ) * map_width;
    var bottom = Math.max( config.y1, config.y2 ) * map_height;
    var grid = document.getElementById("grid");
    grid.style["background-size"] = gridsize_x*20+"px "+gridsize_y*20+"px";
    grid.style["width"] = (map_width - left ) + "px";
    grid.style["height"] = ( map_height - top ) + "px";
    grid.style["padding-left"] = (left + 0.961*gridsize_x ) + "px";
    grid.style["padding-top"] = (top + 0.961*gridsize_y ) + "px";
    var corner1 = document.getElementById("corner1");
    var corner2 = document.getElementById("corner2");
    corner1.style["top"] = ( top-20 ) + "px";
    corner1.style["left"] = ( left-20 ) + "px";
    corner2.style["top"] = ( bottom-20 ) + "px";
    corner2.style["left"] = ( right-20 ) + "px";
}

function doShowGrid() {
    var show = document.getElementById( "showgrid" ).checked;
    var grid = document.getElementById("grid");
    if ( show ) {
        grid.style.visibility = "visible";
    } else {
        grid.style.visibility = "hidden";
    }
}

function doSetImage() {
    var url = document.getElementById("url").value;
    config.url = url;
    //var dm = parseFloat( form[ "dm" ].value );
    var map = document.getElementById("map");
    map.src = url;
    var x1 = document.getElementById( "x1" );
    var y1 = document.getElementById( "y1" );
    var x2 = document.getElementById( "x2" );
    var y2 = document.getElementById( "y2" );
    if ( config.x1 == null ) {
        config.x1 = x1.value = 0;
        config.y1 = y1.value = 0;
    }
    if ( config.x2 == null ) {
        config.x2 = x2.value = 1;
        config.y2 = y2.value = 1;
    }
    var gx = document.getElementById( "gx" );
    var gy = document.getElementById( "gy" );
    if ( config.gx == null ) {
        config.gx = gx.value = 10;
        config.gy = gy.value = 10;
    }
    document.getElementById( "scale" ).value = "100";
    config.scale_val = 100;
    saveConfig();
}

function adjustCharImage( id )
{
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( map_width * ( config.x2 - config.x1 ) ) / config.gx;
    var gridsize_y = Math.abs( map_height * ( config.y2 - config.y1 ) ) / config.gy;
    var img = document.getElementById("creature-img2-"+id);
    var size = config.creatures[id].size;
    if ( size == undefined )
        size = 1;
    if ( img.naturalWidth * gridsize_y > img.naturalHeight * gridsize_x )
    {
        img.width = size * gridsize_x;
        img.height = size * img.naturalHeight * gridsize_x / img.naturalWidth;
    } else {
        img.height = size * gridsize_y;
        if ( img.naturalWidth != 0 )
            img.width = size * img.naturalWidth * gridsize_y / img.naturalHeight;
        else
            img.width = size * gridsize_x;
    }
    placeChar( id );
}

function adjustEffectImage( id )
{
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( map_width * ( config.x2 - config.x1 ) ) / config.gx;
    var gridsize_y = Math.abs( map_height * ( config.y2 - config.y1 ) ) / config.gy;
    var img = document.getElementById("effect-img-"+id);
    var type = config.effects[id].type;
    var sizex = effect_types[type].sx;
    var sizey = effect_types[type].sy;
    img.height = sizey * gridsize_y;
    img.width = sizex * gridsize_x;
    placeEffect( id );
}

function updateCharImage( id, url, name )
{
    var img = document.getElementById("creature-img1-"+id);
    img.src = url;
    img = document.getElementById("creature-img2-"+id);
    img.src = url;
    img.title = name;
}

function updateEffectImage( id  )
{
    var type = config.effects[id].type;
    var desc = config.effects[id].desc;
    var color = config.effects[id].color;
    img = document.getElementById("effect-img-"+id);
    img.src = effect_types[type].img;
    img.title = desc;
    var angle = effect_colors[color].angle;
    adjustEffectImage( id );
    img.style["filter"] = img.style["-webkit-filter"] = "opacity(50%) hue-rotate("+angle+"deg)";
}

function doSetCharImage( id ) {
    var url = document.getElementById("creature-url-"+id).value;
    var name = document.getElementById("creature-name-"+id).value;
    updateCharImage( id, url, name );
    config.creatures[id].url = url;
    config.creatures[id].name = name;
    saveConfig();
}

function doSetEffect( id ) {
    var desc = document.getElementById("effect-desc-"+id).value;
    var type = document.getElementById("effect-type-"+id).value;
    var color = document.getElementById("effect-color-"+id).value;
    config.effects[id].desc = desc;
    config.effects[id].type = type;
    config.effects[id].color = color;
    saveConfig();
    updateEffectImage( id );
}

function doChangeCharSize( id ) {
    var state = document.getElementById("creature-large-"+id).checked;
    if ( state )
        config.creatures[id].size = 2;
    else
        config.creatures[id].size = 1;
    saveConfig();
    adjustCharImage( id );
}

function doDeleteChar( id ) {
    var sidebar = document.getElementById( "sidebar" );
    var dialog = document.getElementById("creature-"+id);
    sidebar.removeChild( dialog );
    var canvas = document.getElementById( "canvas" );
    var img = document.getElementById("creature-img2-"+id);
    canvas.removeChild( img );
    delete config.creatures[id];
    saveConfig();
}

function doDeleteEffect( id ) {
    var sidebar = document.getElementById( "sidebar" );
    var dialog = document.getElementById("effect-"+id);
    sidebar.removeChild( dialog );
    var canvas = document.getElementById( "canvas" );
    var img = document.getElementById("effect-img-"+id);
    canvas.removeChild( img );
    delete config.effects[id];
    saveConfig();
}

function doPickCorner1( event ) {
    var button = document.getElementById( "pick1" );
    if ( pick_mode == 1 ) {
        pick_mode = 0;
    } else {
        pick_mode = 1;
    }
}

function doPickCorner2( event ) {
    var button = document.getElementById( "pick1" );
    if ( pick_mode == 2 ) {
        pick_mode = 0;
    } else {
        pick_mode = 2;
    }
}

function doSetCorner1()
{
    var xo = document.getElementById( "x1" );
    var yo = document.getElementById( "y1" );
    config.x1 = xo.value;
    config.y1 = yo.value;
    adjustGrid();
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
    }
    saveConfig();
}

function doSetCorner2()
{
    var xo = document.getElementById( "x2" );
    var yo = document.getElementById( "y2" );
    config.x2 = xo.value;
    config.y2 = yo.value;
    adjustGrid();
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
    }
    saveConfig();
}

function doClickImage( event ) {
    var map = document.getElementById("map");
    var rect = map.getBoundingClientRect();
    var x = ( event.clientX - rect.left ) / ( rect.right - rect.left );
    var y = ( event.clientY - rect.top  ) / ( rect.bottom - rect.top );
    if (pick_mode == 0 ) {
        return;
    } else if ( pick_mode == 1 ) {
        var xo = document.getElementById( "x1" );
        var yo = document.getElementById( "y1" );
        config.x1 = x;
        config.y1 = y;
    } else if ( pick_mode == 2 ) {
        var xo = document.getElementById( "x2" );
        var yo = document.getElementById( "y2" );
        config.x2 = x;
        config.y2 = y;
    }
    xo.value = x;
    yo.value = y;
    pick_mode = 0;
    adjustGrid();
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
    }
    saveConfig();
}

function saveConfig() {
    window.sessionStorage.config = JSON.stringify( config );
}

function doLoad() {
    var showgrid = document.getElementById( "showgrid" );
    showgrid.checked = false;
    if ( window.sessionStorage.config == null ) {
        config.creatures = {}
        config.effects = {}
    } else {
        config = JSON.parse( window.sessionStorage.config );
        var scale = document.getElementById( "scale" );
        var map = document.getElementById("map");
        var url = document.getElementById("url");
        var scale_val = config.scale_val;
        if ( scale_val == null )
            scale_val = 100;
        scale.value = scale_val;
        if ( config.url != null )
        {
            map.src = config.url;
            url.value = config.url;
        }
        var x1 = document.getElementById( "x1" );
        var y1 = document.getElementById( "y1" );
        if ( config.x1 != null )
        {
            x1.value = config.x1;
            y1.value = config.y1;
        }
        var x2 = document.getElementById( "x2" );
        var y2 = document.getElementById( "y2" );
        if ( config.x2 != null )
        {
            x2.value = config.x2;
            y2.value = config.y2;
        }
        var gx = document.getElementById( "gx" );
        var gy = document.getElementById( "gy" );
        if ( config.gx != null )
        {
            gx.value = config.gx;
            gy.value = config.gy;
        }
        for( id in config.creatures) {
            doAddChar( id );
        }
        if ( config.effects == undefined )
            config.effects = {}
        for( id in config.effects) {
            doAddAreaEffect( id );
        }
        adjustFrame();
    }
}

function copyToClipboard( id ) {
    window.prompt("Copy URL to clipboard: Ctrl+C, Enter", "https://battlemapper.org/load_map.php?id="+id);
}

function doSaveMap() {
    var input = document.getElementById( "post-config" );
    input.value=window.sessionStorage.config;
}

function doReset() {
    id=window.sessionStorage.orig_id;
    if ( id != null ) {
        window.location.replace("/load_map.php?id="+id);
    }
}

function doSetScale() {
    var scale = document.getElementById( "scale" );
    config.scale_val = scale.value;
    saveConfig();
    adjustFrame();
}

function doSetGrid() {
    var gx = document.getElementById( "gx" );
    var gy = document.getElementById( "gy" );
    config.gx = gx.value;
    config.gy = gy.value;
    adjustGrid();
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
    }
    saveConfig();
}

function doChangeScale( factor ) {
    var scale = document.getElementById( "scale" );
    scale_val = scale.value * factor;
    scale.value = scale_val;
    config.scale_val = scale_val;
    saveConfig();
    adjustFrame();
}

function doAddChar( creature_id, clone ) {
    if ( creature_id == null )
    {
        var creature_config = null;
        creature_id = next_char_id.toString();
        next_char_id++;
        config.creatures[creature_id]={url:"",name:"",size:1,x:0,y:0}
        saveConfig();
    } else {
        creature_id = parseInt( creature_id );
        var creature_config = config.creatures[creature_id];
        if ( clone ) {
            var creature_config = JSON.parse( JSON.stringify( creature_config ) );
            creature_id = next_char_id.toString();
            next_char_id++;
            config.creatures[creature_id] = creature_config;
            saveConfig();
        } else {
            if ( next_char_id <= creature_id )
                next_char_id = creature_id + 1;
        }
    }
    var sidebar = document.getElementById( "sidebar" );
    var fieldset = document.createElement( "fieldset" );
    fieldset.style.padding="2mm";
    fieldset.id="creature-"+creature_id;
    fieldset.name=creature_id;
    fieldset.appendChild( document.createTextNode( "Name: " ) );
    var name = document.createElement( "input" );
    name.className = "name";
    name.id="creature-name-"+creature_id;
    name.size=20;
    name.maxlength=30;
    fieldset.appendChild( name );
    fieldset.appendChild( document.createElement( "br" ) );
    fieldset.appendChild( document.createTextNode( "Avatar URL: " ) );
    var url = document.createElement( "input" );
    url.className = "avatarurl";
    url.id="creature-url-"+creature_id;
    url.size=20;
    url.maxlength=1000;
    url.addEventListener( "dragover", function( event ) { allowDrop( event ) } );
    url.addEventListener( "drop", function( event ) { dropOnCharUrl( event ) } );
    url.style.padding="0.5mm";
    url.style.marginTop="2mm";
    fieldset.appendChild( url );
    fieldset.appendChild( document.createElement( "br" ) );
    var div = document.createElement( "div" );
    div.className = "avatar1";
    fieldset.appendChild( div );
    var img = document.createElement( "img" );
    img.id="creature-img1-"+creature_id;
    //img.style.width="10mm";
    img.style.height="10mm";
    img.style.marginTop="2mm";
    //img.style.clip="rect( 200px, 400px, 400px, 200px)"
    img.src="";
    img.addEventListener( "dragover", function( event ) { allowDrop( event ) } );
    img.addEventListener( "drop", function( event ) { dropOnCharImg( event ) } );
    div.appendChild( img );
    img = document.createElement( "img" );
    img.id="creature-img2-"+creature_id;
    img.src="";
    img.name=creature_id;
    img.draggable = true;
    img.addEventListener( "dragstart", function( event ) { startDrag( event ) } );
    img.addEventListener( "load", function() { adjustCharImage( creature_id ) } );
    img.addEventListener( "touchstart", function( event ) { startTouch( event ) } );
    img.addEventListener( "touchmove", function( event ) { allowDrop( event ) } );
    img.addEventListener( "touchend", function( event ) { endTouch( event ) } );
    img.addEventListener( "dragover", function( event ) { allowDrop( event ) } );
    img.addEventListener( "drop", function( event ) { dropOnImage( event ) } );
    img.style.position="absolute";
    var canvas = document.getElementById( "canvas" );
    canvas.appendChild( img );
    var div = document.createElement( "div" );
    div.className = "avatar2";
    fieldset.appendChild( div );
    var button = document.createElement( "button" );
    button.className = "sidebar";
    button.appendChild( document.createTextNode( "set" ) );
    button.addEventListener( "click", function() { doSetCharImage( creature_id ) } );
    div.appendChild( button );
    var button = document.createElement( "button" );
    button.className = "sidebar";
    button.appendChild( document.createTextNode( "delete" ) );
    button.addEventListener( "click", function() { doDeleteChar( creature_id ) } );
    div.appendChild( button );
    var button = document.createElement( "button" );
    button.className = "sidebar";
    button.appendChild( document.createTextNode( "clone" ) );
    button.addEventListener( "click", function() { doAddChar( creature_id, true ) } );
    div.appendChild( button );
    div.appendChild( document.createTextNode( " large: " ) );
    var check = document.createElement( "input" );
    check.id="creature-large-"+creature_id;
    check.type = "checkbox";
    check.addEventListener( "change", function() { doChangeCharSize( creature_id ) } );
    div.appendChild( check );
    sidebar.appendChild( fieldset );
    adjustCharImage( creature_id );
    if ( creature_config != null )
    {
        url.value = creature_config.url;
        name.value = creature_config.name;
        if ( creature_config.size == 2)
             check.checked = true;
        updateCharImage( creature_id, creature_config.url, name.value );
    }
}

function doAddAreaEffect( effect_id ) {
    if ( effect_id == null )
    {
        var effect_config = null;
        effect_id = next_effect_id.toString();
        next_effect_id++;
        config.effects[effect_id]={color:"red",desc:"",type:"s5",x:0,y:0}
        saveConfig();
    } else {
        effect_id = parseInt( effect_id );
        var effect_config = config.effects[effect_id];
        if ( next_effect_id <= effect_id )
            next_effect_id = effect_id + 1;
    }
    var sidebar = document.getElementById( "sidebar" );
    var fieldset = document.createElement( "fieldset" );
    fieldset.style.padding="2mm";
    fieldset.id="effect-"+effect_id;
    fieldset.name=effect_id;
    fieldset.appendChild( document.createTextNode( "Description: " ) );
    var desc = document.createElement( "input" );
    desc.className = "description";
    desc.id="effect-desc-"+effect_id;
    desc.size=20;
    desc.maxlength=50;
    fieldset.appendChild( desc );
    var button = document.createElement( "button" );
    button.className = "sidebar";
    button.appendChild( document.createTextNode( "set" ) );
    button.addEventListener( "click", function() { doSetEffect( effect_id ) } );
    fieldset.appendChild( button );
    var button = document.createElement( "button" );
    button.className = "sidebar";
    button.appendChild( document.createTextNode( "delete" ) );
    button.addEventListener( "click", function() { doDeleteEffect( effect_id ) } );
    fieldset.appendChild( button );
    fieldset.appendChild( document.createElement( "br" ) );
    fieldset.appendChild( document.createTextNode( "type: " ) );
    var type = document.createElement( "select" );
    type.className = "sidebar";
    type.id="effect-type-"+effect_id;
    for( kind_group_name in effect_type_groups ) {
        var optgroup = document.createElement( "optgroup" );
        optgroup.label = kind_group_name;
        kind_group=effect_type_groups[kind_group_name];
        count = kind_group.length;
        for( i=0;i<count;i++ ) {
            kind_id = kind_group[i];
            kind = effect_types[kind_id];
            var option = document.createElement( "option" );
            option.appendChild( document.createTextNode( kind.text ) );
            option.value = kind_id;
            optgroup.appendChild( option );
        }
        type.appendChild( optgroup );
    }
    type.style.padding="0.5mm";
    type.style.marginTop="2mm";
    fieldset.appendChild( type );
    fieldset.appendChild( document.createElement( "br" ) );
    fieldset.appendChild( document.createTextNode( "color: " ) );
    var color = document.createElement( "select" );
    color.id="effect-color-"+effect_id;
    for( kind_id in effect_colors ) {
        kind = effect_colors[kind_id];
        var option = document.createElement( "option" );
        option.appendChild( document.createTextNode( kind.text ) );
        option.value = kind_id;
        color.appendChild( option );
    }
    color.style.padding="0.5mm";
    color.style.marginTop="2mm";
    fieldset.appendChild( color );
    sidebar.appendChild( fieldset );
    img = document.createElement( "img" );
    img.id="effect-img-"+effect_id;
    img.name=effect_id;
    img.draggable = true;
    img.addEventListener( "load", function() { adjustEffectImage( effect_id ) } );
    img.addEventListener( "dragstart", function( event ) { startDrag( event ) } );
    img.addEventListener( "touchstart", function( event ) { startTouch( event ) } );
    img.addEventListener( "touchmove", function( event ) { allowDrop( event ) } );
    img.addEventListener( "touchend", function( event ) { endTouchEffect( event ) } );
    img.addEventListener( "dragover", function( event ) { allowDrop( event ) } );
    img.addEventListener( "drop", function( event ) { dropOnImage( event ) } );
    img.style.position="absolute";
    var canvas = document.getElementById( "canvas" );
    var grid = document.getElementById( "grid" );
    canvas.insertBefore( img, grid.nextSibling );
    if ( effect_config != null )
    {
        type.value = effect_config.type;
        color.value = effect_config.color;
        desc.value = effect_config.desc;
    }
    updateEffectImage( effect_id );
}
