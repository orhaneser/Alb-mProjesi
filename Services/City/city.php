<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 25.01.2019
 * Time: 21:51
 */
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class City extends  database
{
    public $result=array();
    public function get($where,$param){
        $cityrows =$this->select("city",$where,$param);
        if (count($cityrows) == 0) {
            $this->result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($cityrows); $i++) {
                $this->result[] = array("cid" => $cityrows[$i]['cid'],
                    "cname" => $cityrows[$i]['cname'],
                    "ccount" => $cityrows[$i]['ccount'],
                );
            }
        }
        return  $this->result;
    }
}