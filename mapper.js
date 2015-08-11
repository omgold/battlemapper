var pick_mode = 0;
var config = {}
var next_char_id = 0;
var next_effect_id = 0;

var effect_types = {
    r5: { img: "area-5ft-radius.png", text: "5 ft radius", sx: 2, sy: 2 },
    r10: { img: "area-10ft-radius.png", text: "10 ft radius", sx: 4, sy: 4 },
    r20: { img: "area-20ft-radius.png", text: "20 ft radius", sx: 8, sy: 8 },
    c15n: { img: "area-15ft-n-cone.png", text: "15 ft cone (to north)", sx: 3, sy: 3 },
    c15e: { img: "area-15ft-e-cone.png", text: "15 ft cone (to east)", sx: 3, sy: 3 },
    c15s: { img: "area-15ft-s-cone.png", text: "15 ft cone (to south)", sx: 3, sy: 3 },
    c15w: { img: "area-15ft-w-cone.png", text: "15 ft cone (to west)", sx: 3, sy: 3 },
    c15ne: { img: "area-15ft-ne-cone.png", text: "15 ft cone (to north-east)", sx: 3, sy: 3 },
    c15se: { img: "area-15ft-se-cone.png", text: "15 ft cone (to south-east)", sx: 3, sy: 3 },
    c15sw: { img: "area-15ft-sw-cone.png", text: "15 ft cone (to south-west)", sx: 3, sy: 3 },
    c15nw: { img: "area-15ft-nw-cone.png", text: "15 ft cone (to north-west)", sx: 3, sy: 3 },
    c30n: { img: "area-30ft-n-cone.png", text: "30 ft cone (to north)", sx: 8, sy: 6 },
    c30e: { img: "area-30ft-e-cone.png", text: "30 ft cone (to east)", sx: 6, sy: 8 },
    c30s: { img: "area-30ft-s-cone.png", text: "30 ft cone (to south)", sx: 8, sy: 6 },
    c30w: { img: "area-30ft-w-cone.png", text: "30 ft cone (to west)", sx: 6, sy: 8 },
    c30ne: { img: "area-30ft-ne-cone.png", text: "30 ft cone (to north-east)", sx: 6, sy: 6 },
    c30se: { img: "area-30ft-se-cone.png", text: "30 ft cone (to south-east)", sx: 6, sy: 6 },
    c30sw: { img: "area-30ft-sw-cone.png", text: "30 ft cone (to south-west)", sx: 6, sy: 6 },
    c30nw: { img: "area-30ft-nw-cone.png", text: "30 ft cone (to north-west)", sx: 6, sy: 6 }
}

var effect_colors = {
    red: { text: "red", angle: 0 },
    yellow: { text: "yellow", angle: 60 },
    green: { text: "green", angle: 120 },
    cyan: { text: "cyan", angle: 180 },
    blue: { text: "blue", angle: 240 },
    purple: { text: "purple", angle: 300 }
}

function startDrag( event ) {
    event.dataTransfer.setData( "text", event.target.id );
}

function startTouch( event ) {
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
    char.style.left = ( char_config.x * gridsize_x + left ) * map_width + offset_x;
    char.style.top = ( char_config.y * gridsize_y + top ) * map_height + offset_y;
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
    effect.style.left = ( effect_config.x * gridsize_x + left ) * map_width;
    effect.style.top = ( effect_config.y * gridsize_y + top ) * map_height;
    effect.width = effect.width;
}

function dropOnImage( event ) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");
    if ( id.search( /^creature-img2-/ ) != -1 )
    {
        var char = document.getElementById( id );
        var char_config = config.creatures[char.name];
        var size = char_config.size;
        if ( size == undefined )
            size = 1;
        var map = document.getElementById("map");
        var map_width = map.width;
        var map_height = map.height;
        var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
        var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
        var rect = map.getBoundingClientRect();
        var left = Math.min( config.x1, config.x2 );
        var top = Math.min( config.y1, config.y2 );
        var x = ( event.clientX - rect.left ) / map_width - left;
        var y = ( event.clientY - rect.top ) / map_height - top;
        char_config.x = Math.round( x/gridsize_x - size/2. );
        char_config.y = Math.round( y/gridsize_y - size/2. );
        placeChar( char.name );
        saveConfig();
    } else if ( id.search( /^effect-img-/ ) != -1 ) {
        var effect = document.getElementById( id );
        var effect_config = config.effects[effect.name];
        var sizex = effect_types[effect_config.type].sx;
        var sizey = effect_types[effect_config.type].sy;
        var map = document.getElementById("map");
        var map_width = map.width;
        var map_height = map.height;
        var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
        var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
        var rect = map.getBoundingClientRect();
        var left = Math.min( config.x1, config.x2 );
        var top = Math.min( config.y1, config.y2 );
        var x = ( event.clientX - rect.left ) / map_width - left;
        var y = ( event.clientY - rect.top ) / map_height - top;
        effect_config.x = Math.round( x/gridsize_x - sizex/2. );
        effect_config.y = Math.round( y/gridsize_y - sizey/2. );
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
    var touch = event.changedTouches[0];
    var char = event.target;
    var char_config = config.creatures[char.name];
    var size = char_config.size;
    if ( size == undefined )
        size = 1;
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var rect = map.getBoundingClientRect();
    var left = Math.min( config.x1, config.x2 );
    var top = Math.min( config.y1, config.y2 );
    var x = ( touch.clientX - rect.left ) / map_width - left;
    var y = ( touch.clientY - rect.top ) / map_height - top;
    char_config.x = Math.round( x/gridsize_x - size/2. );
    char_config.y = Math.round( y/gridsize_y - size/2. );
    placeChar( char.name );
    saveConfig();
}

function endTouchEffect( event ) {
    var touch = event.changedTouches[0];
    var effect = event.target;
    var effect_config = config.effects[effect.name];
    var sizex = effect_types[effect_config.type].sx;
    var sizey = effect_types[effect_config.type].sy;
    var map = document.getElementById("map");
    var map_width = map.width;
    var map_height = map.height;
    var gridsize_x = Math.abs( config.x2 - config.x1 ) / config.gx;
    var gridsize_y = Math.abs( config.y2 - config.y1 ) / config.gy;
    var rect = map.getBoundingClientRect();
    var left = Math.min( config.x1, config.x2 );
    var top = Math.min( config.y1, config.y2 );
    var x = ( touch.clientX - rect.left ) / map_width - left;
    var y = ( touch.clientY - rect.top ) / map_height - top;
    effect_config.x = Math.round( x/gridsize_x - sizex/2. );
    effect_config.y = Math.round( y/gridsize_y - sizey/2. );
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
    var url = document.getElementById( "creature-url-"+ event.target.parentElement.name );
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
    map.style.top = 0;
    for( creature_id in config.creatures )
    {
        adjustCharImage( creature_id );
    }
    for( effect_id in config.effects )
    {
        adjustEffectImage( effect_id );
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
    }
}

function copyToClipboard( id ) {
    window.prompt("Copy URL to clipboard: Ctrl+C, Enter", "http://battlemapper.org/load_map.php?id="+id);
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
        config.effects[effect_id]={color:"red",desc:"",type:"r5",x:0,y:0}
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
    for( kind_id in effect_types ) {
        kind = effect_types[kind_id];
        var option = document.createElement( "option" );
        option.appendChild( document.createTextNode( kind.text ) );
        option.value = kind_id;
        type.appendChild( option );
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
    var map = document.getElementById( "map" );
    canvas.insertBefore( img, map.nextSibling );
    if ( effect_config != null )
    {
        type.value = effect_config.type;
        color.value = effect_config.color;
        desc.value = effect_config.desc;
    }
    updateEffectImage( effect_id );
}
