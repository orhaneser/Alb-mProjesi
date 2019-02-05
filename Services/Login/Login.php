<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 30.01.2019
 * Time: 10:31
 */
-require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();


switch ($MN){
    case "get":
        $userrows=$db->getrows("SELECT * FROM user u INNER JOIN faculty f on u.fid=f.fid INNER JOIN department d ON u.did=d.blid INNER JOIN city c ON u.city=c.cid INNER JOIN authority a ON u.uauth=a.aid INNER JOIN mail m ON u.usid=m.usid INNER JOIN phone p ON u.usid=p.usid INNER  JOIN userprofileimg n ON u.usid=n.usid WHERE ulgnname=?",array($_POST['param'][0]['uname']));
        if (count($userrows) == 0) {
            $result = array("status" => "None");
        }else{
            $uid = $userrows[0]['usid'];
            $pass =$db->select("password","usid=?",array($uid));
            if (count($pass) != 0 && $pass[0]['passwd'] != $_POST['param'][0]['upass']) {
                $result = array("status" => "None");
            }else{
                for ($i = 0; $i < count($userrows); $i++) {
                    session_start();
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
                        "LoginTime" => time());
                }
                $_SESSION["USER"] =  $result;
            }
        }
        echo  json_encode($result);
        break;
}

