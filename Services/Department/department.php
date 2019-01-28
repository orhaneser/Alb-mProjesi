<?php
require_once('../../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$result=array();


        switch ($MN){
            case "get":
                $depertmanetrows =$db->select("department",$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
                if (count($depertmanetrows) == 0) {
                  $result = array("status" => "None");
                } else {
                    for ($i = 0; $i < count($depertmanetrows); $i++) {
                        $result[] = array("blid" => $depertmanetrows[$i]['blid'],
                            "blname" => $depertmanetrows[$i]['blname'],
                            "fid" => $depertmanetrows[$i]['fid'],
                            "bcount" => $depertmanetrows[$i]['bcount'],
                        );
                    }
                }
                    echo  json_encode($result);
                break;

            case "set":
                $data=$_POST['setdepartment'];
                for ($index = 0; $index < count($_POST['setdepartment']); $index++) {
                    $fdata = array(
                        "blname"=>$data[$index]['blname'],
                        "bcount"=> $data[$index]['bcount'],
                    );
                    $update = $db->update("department",$fdata,$_POST['where'],(isset($_POST['param']) ? $_POST['param'] : array()));
                }
                if ($update) {
                    $result = array("status" => "Succes");
                } else {
                    $result = array("status" => "None");
                }
                echo  json_encode($result);


                break;
    }