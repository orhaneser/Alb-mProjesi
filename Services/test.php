<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 31.01.2019
 * Time: 12:47
 */
require_once('../dbclas/pdocls.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db=new database();


$test=$db->select("department","1",array());
echo base64_encode($test[0]['dpphoto']);