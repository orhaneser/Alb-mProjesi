<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:24
 */
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class BlockList extends  database
{
    public $result=array();
    public  function  get($where,$param){
        $blocklist =$this->select("blocklist",$where,$param);
        if (count($blocklist) == 0) {
            $this->result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($blocklist); $i++) {
                $this->result[] = array("id" => $blocklist[$i]['id'],
                    "email" => $blocklist[$i]['email'],
                    "phone" => $blocklist[$i]['phone'],
                );
            }
        }
        return  $this->result;
    }
}