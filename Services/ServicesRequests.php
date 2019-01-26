<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$SN=$_POST['SN'];
$MN=$_POST['MN'];
$result="";
if($SN=="User"){
    include("User/user.php");
    $user=new $SN();
    if($MN=="get"){
      $result=  $user->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
    }
    echo json_encode($result);
}
if($SN=="Faculty"){
  include("Faculty/faculty.php");
  $faculty=new $SN();
  if($MN=="get"){
      $result=  $faculty->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
  }
    echo json_encode($result);
}
if($SN=="Department"){
  include("Department/department.php");
  $department=new $SN();
  if($MN=="get"){
    $result=  $department->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
  }
    echo json_encode($result);

}
if($SN=="City"){
    include("City/city.php");
    $city=new $SN();
    if($MN=="get"){
        $result=  $city->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
    }
    echo json_encode($result);

}
if($SN=="BlockList"){
    include ("BlockList/BlockList.php");
    $blocklist=new $SN();
    if($MN=="get"){
        $result=  $blocklist->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
    }
    echo json_encode($result);
}
if($SN=="UserMail"){
    include ("UserMail/UserMail.php");
    $usermail=new $SN();
    if($MN=="get"){
        $result=  $usermail->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
    }
    echo json_encode($result);
}
if($SN=="RegisterTemp"){
    include ("RegisterTemp/registertemp.php");
    $registertemp=new $SN();
    if($MN=="get"){
        $result=  $registertemp->$MN($_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
    }
    echo json_encode($result);
}
?>