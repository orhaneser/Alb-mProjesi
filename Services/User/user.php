<?php
require_once('../dbclas/pdocls.php');
header("Content-Type: application/json; charset=UTF-8");
Class User extends database{
    public $result = array();
    public function get($data){
     $propty="";
        for ($i=0; $i <count($data) ; $i++) { 
                if($data[$i]['Operation']=="EQ"){
                $propty.=$data[$i]['PropertyName']."=".$data[$i]['PropertyValue'].' '.'AND';
                }
        }
        $propty=substr($propty, 0, strlen($propty)-4);
        $result=$propty;
        return $result;
    }
}
?>