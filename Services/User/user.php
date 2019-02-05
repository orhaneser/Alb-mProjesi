<?php
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();


switch ($MN) {
    case "get":
        $userrows=$db->getrows("SELECT * FROM user u INNER JOIN faculty f on u.fid=f.fid INNER JOIN department d ON u.did=d.blid INNER JOIN city c ON u.city=c.cid INNER JOIN authority a ON u.uauth=a.aid INNER JOIN mail m ON u.usid=m.usid INNER JOIN phone p ON u.usid=p.usid INNER  JOIN userprofileimg n ON u.usid=n.usid WHERE ulgnname=?",array($_POST['param'][0]));
        if (count($userrows) == 0) {
            $result = array("status" => "None");
        }else{
                for ($i = 0; $i < count($userrows); $i++) {
                    $result[] = array("status" => "OK",
                        "statuscode"=>"200",
                        "usid" => $userrows[$i]['usid'],
                        "usname" => $userrows[$i]['usname'],
                        "uslname" => $userrows[$i]["uslname"],
                        "uauth" => $userrows[$i]["uauth"],
                        "atxt" => $userrows[$i]["atxt"],
                        "city" => $userrows[$i]["city"],
                        "cname" => $userrows[$i]["cname"],
                        "uyear" => $userrows[$i]["uyear"],
                        "fid" => $userrows[$i]["fid"],
                        "fname" => $userrows[$i]["fname"],
                        "did" => $userrows[$i]["did"],
                        "blname" => $userrows[$i]["blname"],
                        "ulgnname" => $userrows[$i]["ulgnname"],
                        "mail" => $userrows[$i]["mail"],
                        "phone" => $userrows[$i]["phone"],
                        "uimg"=>base64_encode($userrows[$i]['usprofimg']),
                        "uspimgid"=>$userrows[$i]['uspimgid'],
                        );
                }
        }
        echo  json_encode($result);
        break;
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
        }
        break;

    case  "set":
        $userdata=$_POST['userdata'];
            for ($index = 0; $index < count($userdata); $index++) {
                $data = array(
                    "usname"=>$userdata[$index]['usname'],
                    "uslname"=>$userdata[$index]['uslname'],
                    "uauth"=>$userdata[$index]['uauth'],
                    "city"=>$userdata[$index]['city'],
                    "uyear"=>$userdata[$index]['uyear'],
                    "fid" => $userdata[$index]['fid'],
                    "did" => $userdata[$index]['did'],
                    "ulgnname" => $userdata[$index]['ulgnname']
                );
                if(null !==$db->beginTransaction()){
                    $db->beginTransaction();
                }
                $upP = $db->update("user", $data, $_POST['where'],(isset($_POST['param']) ? array($_POST['param']) : array()));
            }
            if ($upP) {
                $result = array("status" => "Succes","statuscode"=>"200");
                $db->DoOrDie(true);
            } else {
                $result = array("status" => "None","statuscode","statuscode"=>"0");
                $db->DoOrDie(false);
            }
        echo json_encode($result);
        break;

}