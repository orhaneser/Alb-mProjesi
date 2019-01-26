<?php
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class Department extends database
{
    public $result=array();
    public function get($where,$param){
        $depertmanetrows =$this->select("department",$where,$param);
        if (count($depertmanetrows) == 0) {
            $this->result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($depertmanetrows); $i++) {
                $this->result[] = array("blid" => $depertmanetrows[$i]['blid'],
                    "blname" => $depertmanetrows[$i]['blname'],
                    "fid" => $depertmanetrows[$i]['fid'],
                    "bcount" => $depertmanetrows[$i]['bcount'],
                );
            }
        }
        return  $this->result;
    }
}



?>