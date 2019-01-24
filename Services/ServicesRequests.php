<?php
header("Content-Type: application/json; charset=UTF-8");
$SN=$_POST['SN'];
$MN=$_POST['MN'];
$result="";
if($SN=="User"){
    include("User/user.php");
    $user=new $SN();
    if($MN=="get"){
      $result=  $user->$MN($_POST['data'][0]);
    }
    echo json_encode($result);

}
?>