<?php

$data = file_get_contents('php://input');
$data = json_decode($data, true); // Декодируем JSON-строку (shop.js стр. 235) в нормальный Объект (который нам вернется с сервера - F12- Network (клик на ф-ле mail.php) - Response (data) {"name":"sss","email":"eee","phone":"567","basket": {11: {…}, 55: {…}}


//Развернуто data['basket'] {11: {…}, 55: {…}}
//                           11: {name: 'Яблоки', articul: 'a001', quantity: 3, cost: 12.89, ammount: 38.67}
//                           55: {name: 'Абрикосы', articul: 'a005', quantity: 1, cost: 66.95, ammount: 66.95}

var_dump($data); //Вернется Объект - из которого можна вытянуть необходимые Ключи-Значения
// _____________________________________________________________________________________________
// ПИШЕМ ПИСЬМО

//Сообщение 
$message = 'Имя: '.$data['name']."\n";
$message .= 'Телефон: '.$data['phone']."\n";
$message .= 'Email: '.$data['email']."\n";
$message .= 'Вопрос: '.$data['question']."\n";

$message .= '>>>>>>>>>>>>>>>>>>>>>>'."\n";

$sum = 0;

// $key это id товара в корзине;  $value это Объект data['basket'] -> Ключ "name"- Значение Яблоки
forEach($data['basket'] as $key => $value){
  $message .= 'id: '.$key."\n";
  $message .= 'Наименование товара: '.$value['name']."\n";
  $message .= 'Артикул товара: '.$value['articul']."\n";
  $message .= 'Количество, кг: '.$value['quantity']."\n";
  $message .= 'Стоимость товара, грн/1кг.: '.$value['cost']."\n";
  $message .= 'Сумма, грн.: '.$value['ammount']."\n";

  $message .= '--------------------'."\n";

  $sum = $sum + $value['ammount'];
}

$message .= 'Итого к оплате, грн.: '.$sum;

// Отправляем -> Менеджеру магаза (В МАГАЗИН)

// ОБЯЗАТЕЛЬНО!!!  КОМУ-Менеджеру магаза         ТЕМА             Текст письма (стр. 16-38)  
//$mail = mail ('Sergey.pedko123@gmail.com', 'Shop-GoogleTables', $message);
// __________________________________________________________________________________________

// Отправляем в МАГАЗИН и КЛИЕНТУ (на его почту, прописанную в Корзине в строке Email)

//       Клиент                   Магазин
$to = $data['email'].','.'Sergey.pedko123@gmail.com';

$mail = mail ($to, 'Shop-GoogleTables', $message);

if ($mail) {
  echo 'Письмо отправлено';
  }else{
    echo 'Ошибка отправки почты';
}
?> 