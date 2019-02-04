<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 4.02.2019
 * Time: 16:53
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();


switch ($MN){
    case "get":
        $layouts =$db->select("layouts","1",array());
        if (count($layouts) == 0) {
            $result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($layouts); $i++) {
                $result[] = array("lid" => $layouts[$i]['lid'],
                    "statuscode"=>"200",
                    "lname" => $layouts[$i]['lname'],
                    "lrouter" => $layouts[$i]['lrouter'],
                    "licon"=>$layouts[$i]['licon']
                );
            }
        }
        echo  json_encode($result);
        break;
}