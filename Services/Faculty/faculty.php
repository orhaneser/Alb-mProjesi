<?php
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class Faculty extends database 
{
public $result=array();
public function get($where,$param){
    $facultyrows =$this->select("faculty",$where,$param);
    if (count($facultyrows) == 0) {
        $this->result = array("status" => "None");
    } else {
        for ($i = 0; $i < count($facultyrows); $i++) {
            $this->result[] = array("fid" => $facultyrows[$i]['fid'], 
            "fname" => $facultyrows[$i]['fname'],
            "fscount" => $facultyrows[$i]['fscount'],
        );
        }
    }
    return  $this->result;
}
}




?>