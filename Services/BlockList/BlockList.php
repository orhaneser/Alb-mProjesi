<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:24
 */
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();
            switch ($MN){
                case  "get":
                    $blocklist =$db->select("blocklist",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
                    if (count($blocklist) == 0) {
                        $result = array("status" => "None");
                    } else {
                        for ($i = 0; $i < count($blocklist); $i++) {
                            $result[] = array("id" => $blocklist[$i]['id'],
                                "email" => $blocklist[$i]['email'],
                                "phone" => $blocklist[$i]['phone'],
                            );
                        }
                    }
                 echo   json_encode($result);

                    break;
            }



