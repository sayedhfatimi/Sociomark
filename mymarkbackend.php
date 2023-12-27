<?
	include("connect.php");
	mysql_select_db($md,$mc);
	$username = $_GET['username'];
	$query = mysql_query("SELECT * FROM `members` WHERE `username` = '$username'");
	while($row = mysql_fetch_assoc($query)){
		$result = explode(',',$row['bookmarkID']);
		$array = array();
		for($i = -1; $i<count($result); $i++){
			$b = mysql_query("SELECT * FROM `bookmarks` WHERE `id` = '$result[$i]'");
			array_push($array,mysql_fetch_assoc($b));
		}		
		array_splice($array,0,1);
		print json_encode($array);
	};
	mysql_close();
?>