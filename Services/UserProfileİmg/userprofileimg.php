<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 5.02.2019
 * Time: 21:21
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();
    switch ($MN){
        case  "del":
            if(null !==$db->beginTransaction()){
                $db->beginTransaction();
            }
            $delete =$db->delete("userprofileimg",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
            if ($delete) {
                $result = array("status" => "Succes");
                $db->DoOrDie(true);
            } else {
                $result = array("status" => "None");
                $db->DoOrDie(false);
            }
            echo  json_encode($result);
            break;
        case "add":
            $profileimg=$_POST['profileimg'];
            $tfolder = base64_decode($profileimg[0]['usprofimg']);
            for ($i = 0; $i < count($_POST['profileimg']); $i++) {
                $data = array(
                    "usid" => $profileimg[$i]['usid'],
                    "usprofimg" => $tfolder,
                );
                if(null !==$db->beginTransaction()){
                    $db->beginTransaction();
                }
                $addRows = $db->insert('userprofileimg', $data);
            }
            if ($addRows) {
                $result = array("status" => "Succes");
                $db->DoOrDie(true);
            } else {
                $result = array("status" => "None");
                $db->DoOrDie(false);
            }
            echo  json_encode($result);
            break;


    }

