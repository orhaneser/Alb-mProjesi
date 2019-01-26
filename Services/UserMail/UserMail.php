<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 26.01.2019
 * Time: 19:36
 */
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
class UserMail extends  database
{
    public $result=array();
    public  function  get($where,$param){
        $usermail =$this->select("mail",$where,$param);
        if (count($usermail) == 0) {
            $this->result = array("status" => "None");
        } else {
            for ($i = 0; $i < count($usermail); $i++) {
                $this->result[] = array("mid" => $usermail[$i]['mid'],
                    "usid" => $usermail[$i]['usid'],
                    "mail" => $usermail[$i]['mail'],
                );
            }
        }
        return  $this->result;
    }
}