<?php
/**
 * Created by PhpStorm.
 * User: Yasin
 * Date: 3.01.2019
 * Time: 19:14
 */

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
require_once('../../dbclas/pdocls.php');

    require 'PHPMailer/PHPMailer/src/Exception.php';
    require 'PHPMailer/PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/PHPMailer/src/SMTP.php';
    require_once('../../dbclas/pdocls.php');
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
$db=new database();
$MN=$_POST['MN'];
$results=array();
    switch ($MN){
        case   "sendmail":
                $result = false;
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;
                $mail->CharSet = 'UTF-8';
                $subject =  $_POST['maildata'][0]['subject'];
                $messega = $_POST['maildata'][0]['messega'];
                $mail->addAddress($_POST['maildata'][0]['mail'], '');
                $mail->Username = "ysndlklc1234@gmail.com";
                $mail->Password = "4d32adf5";
                $mail->setFrom("ysndlklc1234@gmail.com", '');
                $mail->addReplyTo("ysndlklc1234@gmail.com", '');
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body = $messega;
                $mail->AltBody = ' ';
                if ($mail->Send()) {
                    $result = true;
                } else {
                    $result = false;
                }
                if ($result == true) {
                    return $results= array("status" => "Succes");
                } else {
                    return $results= array("status" => "None");
                }

            echo  json_encode($results);
            break;
    }




