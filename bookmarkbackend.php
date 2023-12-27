<?
	include("connect.php");
	mysql_select_db($md,$mc);
	$SelectedCategory = $_GET['a'];
	if($SelectedCategory == "all"){
		$b = mysql_query("SELECT * FROM `bookmarks` ORDER BY name");
	} else {
		$b = mysql_query("SELECT * FROM `bookmarks` WHERE category = '$SelectedCategory' ORDER BY name");
	};
	$c = array();
	while($d = mysql_fetch_assoc($b)){
		$c[] = $d;
	};
	print json_encode($c);
	mysql_close();
?>