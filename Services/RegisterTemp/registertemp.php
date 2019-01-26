<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:43
 */
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class RegisterTemp extends  database
{
    public $result=array();
    public  function  get($where,$param){
        $registertemp =$this->select("registertemp",$where,$param);
        if (count($registertemp) == 0) {
            $this->result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($registertemp); $i++) {
                $this->result[] = array("rtid" => $registertemp[$i]['rtid'],
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
        return  $this->result;
    }
    public function ADD($registerdata)
    {
        for ($i = 0; $i < count($registerdata); $i++) {
            $data = array(
                "rtname" => $registerdata[$i]['rtname'],
                "rtlname" => $registerdata[$i]['rtlname'],
                "rtemail" => $registerdata[$i]['rtemail'],
                "rtuniinst" => $registerdata[$i]['rtuniinst'],
                "rtpass" => $registerdata[$i]['rtpass'],
                "rtlcode" => $registerdata[$i]['rtlcode'],
                "rauth" => $registerdata[$i]['rauth'],
                "rphone"=>$registerdata[$i]['rphone'],
            );
            if(null !==$this->beginTransaction()){
                $this->beginTransaction();
            }
            $addRows = $this->insert('registertemptable', $data);
        }
        if ($addRows) {
            $this->result[] = array("status" => "SuccesAdd");
            $this->result;
            $this->DoOrDie(true);
        } else {
            $this->result = array("status" => "None");
            $this->result;
            $this->DoOrDie(false);
        }
        return $this->result;
    }
}