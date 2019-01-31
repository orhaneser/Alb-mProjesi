<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 31.01.2019
 * Time: 13:47
 */

require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();
session_start();
switch ($MN) {
    case "get":
        $time=$_SERVER['REQUEST_TIME'];
        $timeout_duration=6000;
        if($_SESSION["USER"]&&(time()-$_SESSION["USER"][0]["LoginTime"]>$timeout_duration)) {
            session_unset();
            session_destroy();
            $result = array("status" => "204");
        }else{
            $result = array("status" => "200");
        }
        echo  json_encode($result);
        break;
    case "del":
        break;
};