<?php
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
switch ($MN){
    case "get":
        $facultyrows =$db->select("faculty",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
        if (count($facultyrows) == 0) {
            $result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($facultyrows); $i++) {
                $result[] = array("fid" => $facultyrows[$i]['fid'],
                    "fname" => $facultyrows[$i]['fname'],
                    "fscount" => $facultyrows[$i]['fscount'],
                );
            }
        }
        echo  json_encode($result);
    break;
    case "set":
            $data=$_POST['setfaculty'];
            for ($index = 0; $index < count($_POST['setfaculty']); $index++) {
                $fdata = array(
                    "fname"=>$data[$index]['fname'],
                    "statuscode"=>"200",
                    "fscount"=> $data[$index]['fscount'],
                );
                $update = $db->update("faculty",$fdata,$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
            }
            if ($update) {
                $result = array("status" => "Succes");
            } else {
                $result = array("status" => "None");
            }
            echo  json_encode($result);

        break;


}




