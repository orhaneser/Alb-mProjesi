<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:36
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();

switch ($MN){

    case "get":
        $usermail =$db->select("mail",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
        if (count($usermail) == 0) {
            $result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($usermail); $i++) {
                $result[] = array("mid" => $usermail[$i]['mid'],
                    "usid" => $usermail[$i]['usid'],
                    "mail" => $usermail[$i]['mail'],
                );
            }
        }
       echo  json_encode($result);


        break;

}
