<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:43
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();
    switch ($MN){
        case  "get":
            $registertemp =$db->select("registertemp",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
            if (count($registertemp) == 0) {
                $result = array("status" => "None");
            } else {
                for ($i = 0; $i < count($registertemp); $i++) {
                    $result[] = array("rtid" => $registertemp[$i]['rtid'],
                        "uname" => $registertemp[$i]['uname'],
                        "ulastname" => $registertemp[$i]['ulastname'],
                        "uphone" => $registertemp[$i]['uphone'],
                        "umail" => $registertemp[$i]['umail'],
                        "ufaculty" => $registertemp[$i]['ufaculty'],
                        "udepartment" => $registertemp[$i]['udepartment'],
                        "upass" => $registertemp[$i]['upass'],
                        "rcode" => $registertemp[$i]['rcode'],
                        "ucity" => $registertemp[$i]['ucity'],
                        "uyear" => $registertemp[$i]['uyear'],
                    );
                }
            }
            echo  json_encode($result);
            break;
        case "add":
            $registerdata=$_POST['registerdata'];
            for ($i = 0; $i < count($_POST['registerdata']); $i++) {
                $data = array(
                    "uname" => $registerdata[$i]['uname'],
                    "ulastname" => $registerdata[$i]['ulastname'],
                    "uphone" => $registerdata[$i]['uphone'],
                    "umail" => $registerdata[$i]['umail'],
                    "ufaculty" => $registerdata[$i]['ufaculty'],
                    "udepartment" => $registerdata[$i]['udepartment'],
                    "upass" => $registerdata[$i]['upass'],
                    "rcode"=>$registerdata[$i]['rcode'],
                    "ucity"=>$registerdata[$i]['ucity'],
                    "uyear"=>$registerdata[$i]['uyear'],
                );
                if(null !==$db->beginTransaction()){
                    $db->beginTransaction();
                }
                $addRows = $db->insert('registertemp', $data);
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
        case "del":
            if(null !==$db->beginTransaction()){
                $db->beginTransaction();
            }
            $delete =$db->delete("registertemp",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
            if ($delete) {
                $result = array("status" => "Succes");
                $db->DoOrDie(true);
            } else {
                $result = array("status" => "None");
                $db->DoOrDie(false);
            }
            echo  json_encode($result);
            break;
    }

