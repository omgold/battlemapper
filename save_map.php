<?php
$db = mysql_connect( "localhost", "web793", "mypassword", true );
mysql_select_db( "usr_web793_1" );
$config=mysql_real_escape_string(json_encode(json_decode($_POST['config'])));
$res = mysql_query( "insert into maps (config) values ('$config');" );
$id=mysql_insert_id();
header("Location: /load_map.php?id=$id");
?>