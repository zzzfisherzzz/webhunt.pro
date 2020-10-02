<?php


/* https://api.telegram.org/bot1028782714:AAHZhzqjibnBPp0Oa7swD0OfkIuk-5VfwH4/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

define('TELEGRAM_TOKEN', '1028782714:AAHZhzqjibnBPp0Oa7swD0OfkIuk-5VfwH4'); // Test
define('TELEGRAM_CHATID', '-389739028');

function SendTelFile($type, $data) {

    if ($type == 'sendDocument') {
         $RealTitleID = $_FILES[$data]['name'];
         $data = new CurlFile($_FILES[$data]['tmp_name'], 'file/exgpd', $RealTitleID);
    }

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.telegram.org/bot'.TELEGRAM_TOKEN.'/'.$type,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => [
            'Content-Type: multipart/form-data'
        ],
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'chat_id' => TELEGRAM_CHATID,
            'text'  => $data,
            'parse_mode' => 'html',
            'document' => $data
        ]
    ]);
    $out = curl_exec($ch);
    curl_close($ch);
    print_r($out);
}

$urlSite = preg_replace('/\?.*/', '', $_SERVER['HTTP_REFERER']);

$arr = array(
  'Новая заявка с сайта:' => '<a href="'.$urlSite.'">'.$urlSite.'</a>',
  'Имя:' => $_POST['name'],
  'Телефон:' => $_POST['phone'],
  'Comment:' => $_POST['message'],
  'Email' => $_POST['email'],
  'Source' => $_POST['utm_source'],
  'Medium' => $_POST['utm_medium'],
  'Campaign' => $_POST['utm_campaign'],
  'Content' => $_POST['utm_content'],
  'Term' => $_POST['utm_term'],
);

foreach($arr as $key => $value) {
    $message .= "<b>".$key."</b> ".$value."\n";
}

SendTelFile('sendMessage', $message);

?>
















