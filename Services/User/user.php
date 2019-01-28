<?php
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();


switch ($MN) {
    case "add":
        $userdata = $_POST['userdata'];
        for ($i = 0; $i < count($_POST['userdata']); $i++) {
            $data = array(
                "usname" => $userdata[$i]['usname'],
                "uslname" => $userdata[$i]['uslname'],
                "uauth" => $userdata[$i]['uauth'],
                "city" => $userdata[$i]['city'],
                "uyear" => $userdata[$i]['uyear'],
                "fid" => $userdata[$i]['fid'],
                "did" => $userdata[$i]['did'],
                "ulgnname"=>$userdata[$i]['ulgnname'],
            );
            if (null !== $db->beginTransaction()) {
                $db->beginTransaction();
            }
            $addRows = $db->insert('user', $data);
            $userRows = $db->getrows("SELECT  * FROM user  WHERE ulgnname=?", array($userdata[$i]['ulgnname']));
            $uid = $userRows[0]['usid'];
            if ($addRows) {
                $data = array(
                    "passwd" => $userdata[$i]['passwd'],
                    "usid" => $uid
                );
                $addpassRows = $db->insert('password', $data);
                if ($addpassRows) {
                    $data = array(
                        "mail" => $userdata[$i]['mail'],
                        "usid" => $uid
                    );
                    $addmailRows = $db->insert('mail', $data);
                    if ($addmailRows) {

                            $data = array(
                                "phone" => $userdata[$i]['phone'],
                                "usid" => $uid
                            );
                            $addphoneRows = $db->insert("phone", $data);
                            if ($addphoneRows) {
                                $db->DoOrDie(true);
                                $result = array("status" => "Succes");
                            } else {
                                $result = array("status" => "None");
                                $db->DoOrDie(false);
                            }
                    }
                }else{


                    $result = array("status" => "None");
                    $db->DoOrDie(false);


                }


            }else{


                $result = array("status" => "None");
                $db->DoOrDie(false);


            }
            echo json_encode($result);
            break;
        }
}