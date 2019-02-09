<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 25.01.2019
 * Time: 21:51
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();
        switch ($MN){
            case "get":
                $cityrows =$db->select("city",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
                if (count($cityrows) == 0) {
                    $result = array("status" => "None");
                } else {
                    for ($i = 0; $i < count($cityrows); $i++) {
                        $result[] = array("cid" => $cityrows[$i]['cid'],
                            "statuscode"=>"200",
                            "cname" => $cityrows[$i]['cname'],
                            "ccount" => $cityrows[$i]['ccount'],
                        );
                    }
                }
              echo  json_encode($result);
                break;
            case "set":{
                $data=$_POST['setcity'];
                for ($index = 0; $index < count($_POST['setcity']); $index++) {
                    $cdata = array(
                        "cname"=>$data[$index]['cname'],
                        "ccount"=> $data[$index]['ccount'],
                    );
                    $update = $db->update("city",$cdata,$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
                }
                if ($update) {
                    $result = array("status" => "Succes");
                } else {
                    $result = array("status" => "None");
                }
                echo  json_encode($result);


                break;
            }
        }


