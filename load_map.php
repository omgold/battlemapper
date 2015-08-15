<script>
<?php
$db = mysql_connect( "localhost", "web793", "mypassword", true );
mysql_select_db( "usr_web793_1" );
$id = intval( $_GET['id'] ); 
$res = mysql_query( "select config from maps where id='$id'" );
$config_str = mysql_result( $res, 0 );
print "window.sessionStorage.orig_id = $id;";
print "var config = $config_str;"
?>
window.sessionStorage.config = JSON.stringify( config );
window.location.replace("/mapper.html");
</script>
