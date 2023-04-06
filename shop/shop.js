// Google API
// Идентификатор : 612234971375-ionoh0ls8qu7sksod8ghp4bt4pnidleq.apps.googleusercontent.com
// Ключ: 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
//_____________________________________________________________________________________________________

// Файл – Поделиться – Опубликовать в интернете
// https://docs.google.com/spreadsheets/d/e/2PACX-1vTZOntsZadl5jm7SvRTQ1vdeNtNQBxJveX9EihBgu0jlb3YR3QKptRbsCGogriIdD_DV7C2AZj3SvOM/pubhtml
//______________________________________________________________________________________________________

// Это скопированная ссылка из Google Table - в URL - нужно вставлять только ее часть !!!
// https://docs.google.com/spreadsheets/d/1ZfVA2nizZ5-edHnBKj0QVdNIV4HGb2e0ulBFqlk_KDI/edit#gid=0
//                                        1ZfVA2nizZ5-edHnBKj0QVdNIV4HGb2e0ulBFqlk_KDI

// ________________________________с июля 2022 - так НЕ РАБОТАЕТ!!!!___________________________________________________

// Как выход - написать скрипт в гугл - таблице по конверту данных в JSON - в конце генерируем URL адресс, по которму осуществляем запрос 

// КОНВЕРТАЦИЯ ГУГЛ-ТАБЛИЦИ (Google_Shop) В JSON
// В таблице: РАСШИРЕНИЯ -> Apps Script - пишем ф-цию - Сохраняем
// При извенении (добавлении-удалении) столбцов-строк таблици: fetch(url) - возвращает измененные данные АВТОМАТОМ

//                function doGet() {
//                  var sheet = SpreadsheetApp.getActive();
//                  var table = sheet.getSheetByName("GShop");
//                  var data = [];
//                  var rlen = table.getLastRow();
//                  var clen = table.getLastColumn();
//                  var rows = table.getRange(1,1,rlen, clen).getValues();
//                  for(var i=1; i<rows.length; i++){
//                    var datarow = rows[i];
//                    var record = {};
//                    for(var j=0; j<clen; j++){
//                   record[rows[0][j]] = datarow[j];
//                    }
//                    data.push(record);
//                  }
//                   console.log(data);
//                  var result = JSON.stringify(data);
//                  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
//                }

// В Apps Script: Начать развертывание-> Новое развертывание -> ВЕБ-приложение [ОПИСАНИЕ - например: GetJson] ->
//                -> [ЗАПУСК - от МОЕГО имени] -> [Укого есть доступ -ВСЕ (либо только у меня)] ->
//                -> Начать развертывание -> (дать доступ исспользовать данные) ->Google выдаст URL:
// https://script.google.com/macros/s/AKfycbzmDY3JOZN57OzY_jAFkbKEDsX4PPiy9Kx_Y2ZMYzLMXf4LY6a8OhD6Rkde__e9ZIbL/exec


// ___________________________________________ИНТЕРНЕТ - МАГАЗИН_____________________________________________

let basket = {}; // Объект - КОРЗИНА

let ul = document.querySelector(`.basket`); //Вывод КОРЗИНЫ
let total = document.querySelector(`.total`); // Вывод ИТОГО по ВСЕМ ПОЗИЦИЯМ КОРЗИНЫ

// Делаем загрузку корзины из сформированной (стр. 186) localStorage - т.е. Если в корзине уже что-то лежало (данные из localStorage), то даже ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦИ - ДАННЫЕ ИЗ КОРЗИНЫ НЕ ИСЧЕЗНУТ!!!

// ЧТОБЫ ДАННЫЕ ИЗ КОРЗИНЫ ИСЧЕЗЛИ- вручную оцищаем localStorage 
//  F12(ПКМ - Просмотр кода страници) -> Application ->Storage(click)-> Очистить

function loadBasketFromStorage() {// Если localStorage очищена - выдаст null (Ощибка!!!)

  if (localStorage.getItem(`basket`)!= undefined) { // ПРОВЕРКА на null - Если не прописать if -> ОШИБКА !!!

    // ОПЕРАТОР НЕРАВЕНСТВА "!=" возвращает противоположное значение оператора равенства.
    // Работаем, когда в Корзине уже что-то Есть! (корзина не пустая) -> (НЕРАВНО undefined)

    basket = JSON.parse(localStorage.getItem(`basket`)); // стр. 198 Превращаем JSON.строку в -> Object(Корзина)
    console.log(`В корзине уже лежит Объект из localStorage:`, basket); 
  };
};

loadBasketFromStorage();

// Делаем ЗАПРОС к GoogleSheet
let url = "https://script.google.com/macros/s/AKfycbzmDY3JOZN57OzY_jAFkbKEDsX4PPiy9Kx_Y2ZMYzLMXf4LY6a8OhD6Rkde__e9ZIbL/exec";

let shopField = document.querySelector(`.shop-field`);
console.log(shopField); // Проверочка

fetch(url).then((response)=>{
  console.log(response);
  response.json().then((responseData)=>{
    console.log(responseData); // [{...},{...},{...},{...},{...}]

// ______________________________________________________________________________________
// У нас есть Массв Объектов - responseData - [{...},{...},{...},{...},{...}] 
      // Трансвормация Массва Объектов в => OБЪЕКТ в форме Ключ - Значение (см. helper.html ст. 106-202)

      //                                      id         id         id         id         id
      //  Необходимо преобразовать в OБЪЕКТ: {11: {...}, 22: {...}, 33: {...}, 44: {...}, 55:{...}}

      function arrayHelper(arr) {
              let out = {};
      
        for (let i = 0; i < arr.length; i++) {
          let tmp = {};
          // Добавляем в Объект tmp - элементы (Ключ-Значение)
          tmp[`articul`] = arr[i][`articul`];
          tmp[`category`] = arr[i][`category`];
          tmp[`name`] = arr[i][`name`];
          tmp[`image`] = arr[i][`image`];
          tmp[`cost`] = arr[i][`cost`];
          tmp[`description`] = arr[i][`description`];
          tmp[`kg`] = arr[i][`kg`];
          tmp[`show`] = arr[i][`show`];
      
          // Добавляем в Объект out - элементы объекта tmp (Ключ-Значение)
          // out[`id`] = объект tmp 
          out[arr[i][`id`]] = tmp; // (в цикле для каждого элемента arr[i] входяжего массива)
        };
        return out;
      };

      //let goods = {}; - Вспомагательный объект - ТОВАРЫ
      let goods = arrayHelper(responseData); // Переменной goods присваиваем ВЫПОЛНЕНИЕ ф-ции arrayHelper(responseData)
      console.log(goods, typeof goods); //{11: {…}, 22: {…}, 33: {…}, 44: {…}, 55: {…}} `object`

      showBasket(); // Когда у нас появился Объект-goods -> Выполняя ф-цию выводим корзину на Экран (Вывод ф-ции 2 РАЗ- стр.195)
   
// ______________________________________________________________________________________________________

//  Перебираем массив и выводим в цикле данныее на экран
    responseData.forEach((element, index) => {
      // console.log(element); // Проверочка
    });

//                         _________________ДЕСТРУКТУРИЗАЦИЯ - element___________________ 
    responseData.forEach(({id, articul, category, name, image, cost, description, kg, show}, index) => {

      if (`${show}`!= 0) {// Если в таблице в графе "show" есть НОЛЬ - то на экран НЕ ВЫВОДИТСЯ (Вишня)

       shopField.innerHTML = shopField.innerHTML +  `<div class="col text-center">
                                                          <div class="goods">
                                                             <p class="names"><b>${name}</b></p> 
                                                             <p class="desc">${description}</p>
                                                             <p><img src="${image}"></p>
                                                             <p class="cost">Цена: ${cost} грн/кг</p>  
                                                             <p>На складе: ${kg} кг</p>  
                          <p><input class="btn btn-success" type="button" value="В корзину" name="add-to-basket" data="${id}"></p>
                                                          </div> 
                                                    </div>`
// АТРИБУТ data="" (допустима комбинация через дефиз data-weight="") - применяется для задания каких-то Данных напямую в элемент HTML - которые могут в последующем быть обработаны в JS (при помощи оператора: dataset.weight (или dataset - если было приписано data=""

// Прописываем в кнопку АТРИБУТ data="" и прописываем внутрь id - теперь каждой кнопке соответствует id товара из Гугл-Таблици - ДЛЯ РЕАЛИЗАЦИИ КОРЗИНЫ!!!  
      };
    });
// _____________________________________________________________________________________________________

      document.onclick = function (event) { // Происходят события: 1) Нажимаем кнопку-В корзину; 2) Нажимаем кнопку-Удалить; 3) Нажимаем кнопки-Добавить(+) / Отнять(-); 
        
          console.log(event.target);
          
          if (event.target.attributes.name != undefined) { // Чтобы мы работали только с объектами у которых ЕСТЬ атрибут name=".."

            //CВОЙСТВО target ОБЪЕКТА Event - (event.target) -позволяет ПОЛУЧИТЬ ЭЛЕМЕНТ, В КОТОРОМ ПРОИЗОШЛО СОБЫТИЕ (click)

          // Если кликнуть по полю, где расположены элементы, то вернется -  <div class="shop-field row"></div>
          // Если кликнуть по картинке-лимон, то вернется -  <img src="https://cdn0.iconfinder.com/data/icons/fruits/128/Lemon.png">

          // Если кликнуть по Первой КНОПКЕ, то вернется -  <input class="btn btn-success" type="button" value="В корзину" name="add-to-basket" data="11">

           console.log(event) 
           
           // Если кликнуть по Первой КНОПКЕ, то вернется Объект -PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}

                             // PointerEvent -> target -> attributes (class, type, value, name, data) -> data ->  nodeValue
                             // node.Value и есть то, что мы прописивали в кнопке data="${id} !!!!
          
          console.log(event.target.attributes.data.nodeValue); 
          // При нажатии на кнопки (по порядку), вернет строковые наши id: "11", "22", "33", "44", "55"

          console.log(event.target.attributes.name.nodeValue); // При нажатии на кнопки (по порядку), будет возвращать прописанные в кнопки: add-to-basket (name="add-to-basket")

//         if-Конструкция (ПРОВЕРКА - ЧТО ИМЕННО ТА КНОПКА)- ОБЯЗАТЕЛЬНО!!!! - ИТНАЧЕ РАБОТАТЬ НЕ БУДЕТ!!!
          if (event.target.attributes.name.nodeValue == `add-to-basket`) { // Проверка, что мы нажали именно на Кнопку-В корзину
            addToBasket(event.target.attributes.data.nodeValue) // Выполняем ф-цию addToBasket
       
            //Может выполнится ф-ция, в зависимости на какую кнопку нажали: addToBasket("11");
            //                                                              addToBasket("22");
            //                                                              addToBasket("33");
            //                                                              addToBasket("44");
            //                                                              addToBasket("55");

          }else if(event.target.attributes.name.nodeValue == `delete-goods`){// Проверка, что мы нажали именно на Кнопку Удалить

            delete basket[event.target.attributes.data.nodeValue]; //Удаляем элемент из Объекта-basket

            showTotal(); // // Скрываем `<p> ВСЕГО к Оплате <b>${result2}</b> грн.</p>`, если Корзина - ПУСТАЯ
            showBasket(); // На основе измененной Корзины - ПЕРЕРИСОВЫВАЕМ ЕЕ
            
            
            // После Удаления элементов  - переписываем данные в localStorage
            localStorage.setItem(`basket`, JSON.stringify(basket)); // Просто объект basket - передать НЕЛЬЗЯ -                 будет - object[Object] -> трансформируем в JSON-строку -> например: {"11":4,"22":1}

            console.log(basket); // Проверочка

          }else if(event.target.attributes.name.nodeValue == `plus`){// Проверка, что мы нажали именно на Кнопку Добавить(+)

            basket[event.target.attributes.data.nodeValue] = basket[event.target.attributes.data.nodeValue] + 1;

            showBasket(); // На основе измененной Корзины - ПЕРЕРИСОВЫВАЕМ ЕЕ

            
            // После изменения элементов  - переписываем данные в localStorage
            localStorage.setItem(`basket`, JSON.stringify(basket)); // Просто объект basket - передать НЕЛЬЗЯ -                 будет - object[Object] -> трансформируем в JSON-строку -> например: {"11":4,"22":1}

            console.log(basket); // Проверочка

          }else if(event.target.attributes.name.nodeValue == `minus`){// Проверка, что мы нажали именно на Кнопку Отнять(-)

            if (basket[event.target.attributes.data.nodeValue] - 1 == 0) {//Если мы доотнимались до ОТРИЦАТЕЛЬНЫХ значений штук - УДАЛЯЕМ весь элемент
              delete basket[event.target.attributes.data.nodeValue]; //Удаляем элемент из Объекта-basket

            }else{
              basket[event.target.attributes.data.nodeValue] = basket[event.target.attributes.data.nodeValue] - 1;
            };

            showBasket(); // На основе измененной Корзины - ПЕРЕРИСОВЫВАЕМ ЕЕ
            
            // После изменения элементов  - переписываем данные в localStorage
            localStorage.setItem(`basket`, JSON.stringify(basket)); // Просто объект basket - передать НЕЛЬЗЯ -                 будет - object[Object] -> трансформируем в JSON-строку -> например: {"11":4,"22":1}

            console.log(basket); // Проверочка

          }else if(event.target.attributes.name.nodeValue == `buy`){ //Отправляем Email - заполненная форма + Все, что в Корзине
            let data = {
              name:  document.querySelector(`#customer-name`).value,
              email: document.querySelector(`#customer-email`).value,
              phone: document.querySelector(`#customer-phone`).value,
              question: document.querySelector(`#customer-question`).value,
              
              basket: showEmail() // Ключу (basket) - передаем значение -> showEmail() -которая выводит разверную Корзину
            };

            console.log(`Для файла mail.php - сформирован Объект`, showEmail()); //Проверочка

            fetch("php_mail/mail.php",
             {
              method: "POST",
              body: JSON.stringify(data) // Загоняем Объект - в JSON-строку для передачи данных по Почте (mail.hph)

            }).then(function (response) {
              console.log(response);

              if (response) {
                alert(`Ваш заказ отправлен на обработку - в ближайшее время с Вами свяжется менеджер нашего магазина. Спасибо за покупку`);
              } else {
                alert(`Ошибка заказа`);
              };

            }).catch(function (error) {
              console.log(`404 - Ошибка отправки почты, ${error}`);
            });
          };
        };    
      };

          
            function showEmail() { // Сформируем объект (из объектов basket и goods) - для ОТПРАВКИ НА ПОЧТУ!!!
            let emailObj = {};
            let sum = 0;
    
              for (let key in basket) {
                 let tmp = {};
  
              // Чтобы перебирать basket - а выводить данные по аналогичному ключу из объекта goods -> НЕОБХОДИМО:
              // 1) Объект basket должен быть ТОЛЬКО - Number - Number (иначе ОШИБКА ф-ции showBasket() !!!!!)
              // 2) Объект goods  должен быть ТОЛЬКО - Number - {Object} ((иначе ОШИБКА ф-ции showBasket() !!!!!)
              // Добавляем в Объект tmp - элементы (Ключ-Значение)
  
                tmp[`name`] = goods[key][`name`] // Наименование товара
                tmp[`articul`] = goods[key][`articul`] // Артикул товара
  
                tmp[`quantity`] = basket[key] // Кол-во, кг
                tmp[`cost`] =  goods[key][`cost`]// Стоимость товара, грн/1кг.

                let ammount =  goods[key][`cost`] * basket[key];
  
                tmp[`ammount`] =  ammount // Итого (по Одной позиции), грн
  
                //sum = sum + goods[key][`cost`] * basket[key];

                //tmp[`sum`] =  sum; // Всего (по ВСЕМ ПОЗИЦИЯМ), грн
                // ____________________________________________________________
  
                // Добавляем в Объект emailObj - элементы объекта tmp (Ключ-Значение)
                emailObj[key] = tmp; // (в цикле)
              };
              return emailObj;
           };

          
          function addToBasket(key) { //Ф-ция будет брать объект basket - (см. helper.html ст. 35-103)

            if (basket[key] != undefined) {
              // ОПЕРАТОР НЕРАВЕНСТВА "!=" возвращает противоположное значение оператора равенства.
              // Если Корзине уже есть такая пара - то увеличиваем значение на ЕДИНИЦУ

              // Кликаем Второй раз на Первой кнопке - объекта  basket - уже есть пара (basket["11"] = 1)
              basket[key] = basket[key] + 1; //то мы увеличим это значение на 1 (basket["11"] = 2)
            } else{
              basket[key] = 1; // Кликаем Первый раз на Первой кнопке -  добавим новую пару basket["11"] = 1
                               // Кликаем Третий раз на Пятой кнопке  -  добавим новую пару basket["55"] = 1
            };
                                 //           id     id              
            console.log(basket); //bascket = {11: 2, 55: 1} - Мы купили: Яблоки(id=11) - 2кг и Абрикосы(id=55) - 1кг;  

            showBasket(); // Выполняя ф-цию выводим корзину на Экран (Вывод ф-ции 1 РАЗ)

            // Чтобы корзина не исчезала (очищалась) после перезагрузки страници -  Записываем данные в localStorage
            localStorage.setItem(`basket`, JSON.stringify(basket)); // Просто объект basket - передать НЕЛЬЗЯ -                 будет - object[Object] -> трансформируем в JSON-строку -> например: {"11":4,"22":1}
          };


          function showBasket() {
            
            ul.innerHTML = " "; // Очищаем содержимое <ul> - перед занесением новых данных (нам нужен - конечный объект)

            let sum = 0; // Для расчета ВСЕГО денег ПО ВСЕМ ПОЗИЦИЯМ.

            for(let key in basket) { //Перебираем объект basket

              // Чтобы перебирать basket - а выводить данные по аналогичному ключу из объекта goods -> НЕОБХОДИМО:
              // 1) Объект basket должен быть ТОЛЬКО - Number - Number (иначе ОШИБКА ф-ции showBasket() !!!!!)
              // 2) Объект goods  должен быть ТОЛЬКО - Number - {Object} ((иначе ОШИБКА ф-ции showBasket() !!!!!)

              console.log(key); // Проверочка
              console.log(basket[key]); // Проверочка

              //       id
              // goods[key][`name`]; - имя товара - по идентичному ключу из объекта goods
              //                                    (ключ объекта basket == ключ объекта goods)
              //        id
              // basket[key]; - кол-во - из объекта basket
              // goods[key][`cost`]; - стоимость товара - по идентичному ключу из объекта goods

              // Итого: goods[key][`cost`] * basket[key]
              let ammount =  goods[key][`cost`] * basket[key];
              // Округляем до ДВУХ ЗНАКОВ после запятой (type number) - parseFloat(3.14159265359.toFixed(3)); // 3.142
              let result1 = parseFloat(ammount.toFixed(2)); 


              ul.innerHTML = ul.innerHTML + `<li class="btn-pdng"> 
                                                 <p> Наименование товара: <b>${goods[key][`name`]}</b></p> 
                                                 <p> Кол-во: <b>${basket[key]}</b> кг.</p>

                                        <p class="btn-pdng">
                                          <input type="button" value="-" name="minus"class="btn btn-warning btn-sm" data="${key}">
                                          <input type="button" value="+" name="plus"class="btn btn-success btn-sm" data="${key}">
                                        </p>

                                                 <p> Стоимость товара: <b>${goods[key][`cost`]}</b> грн/1кг.</p> 
                                                 <p> Итого: <b>${result1}</b> грн.</p> 

                                                 <p class="btn-pdng"> <input type="button" value="Удалить" name="delete-goods" class="btn btn-outline-danger btn-sm" data="${key}"></p> 
                                            </li>`;

             // ВСЕГО к Оплате  -> sum
             sum = sum + goods[key][`cost`] * basket[key];

             console.log(sum);

             // Округляем до ДВУХ ЗНАКОВ после запятой (type number) - parseFloat(3.14159265359.toFixed(3)); // 3.142
             let result2 = parseFloat(sum.toFixed(2)); 
             total.innerHTML = `<p> ВСЕГО к Оплате <b>${result2}</b> грн.</p>`;
            };  
          };

         //__________ Скрываем `<p> ВСЕГО к Оплате <b>${result2}</b> грн.</p>`, если Корзина - ПУСТАЯ______
          function showTotal() { //help.html (стр.571-594)___
              if (Object.keys(basket).length == 0) {
            total.innerHTML = `<p> Ваша корзина пуста.</p>`;
           };  
        };

      
          //__________ ПИШЕМ ПОИСК ПО САЙТУ - help.html (стр.62, 524-566)_____________________________

          let elasticItems = document.querySelectorAll(`.goods`); // Товары ранее выведены на экран- стр.125-143

          elasticItems.forEach((element)=>{ // Вынимаем НАЗВАНИЯ ТОВАРА из БЛОКОВ  <div class="goods"> в ОДНОМ ЦИКЛЕ по БЛОКУ <div class="goods">
              console.log(element); // Весе БЛОКИ  <div class="goods">
              console.log(element.firstChild.nextSibling);// <p class="names">...</p> - которые содержат НАЗВАНИЯ ТОВАРА 
              console.log(element.firstChild.nextSibling.innerText); // Сами НАЗВАНИЯ ТОВАРА - 'Яблоки', 'Груши', 'Лимоны', 'Вишни', 'Абрикосы' 
            });

            document.querySelector(`.elastic`).oninput = function () {
              let val = this.value.trim(); //.trim() - обрезка ПРОБЕЛОВ (можно вводить с пробелами)
          
              if (val != '') { // Если поле input НЕ ПУСТОЕ !!!
                elasticItems.forEach((element)=>{// Весе БЛОКИ  <div class="goods">
                  if (element.firstChild.nextSibling.innerText.search(val) == -1) { // т.е. НАЗВАНИЯ ТОВАРА (стр.375) не содержат букв, набранных в Строке ПОИСКА
                    element.classList.add(`hide-goods`); // убираем сласс hide-goods
                  }else{
                    element.classList.remove(`hide-goods`);
                  };
                });  
              }else{ // Если поле input ПУСТОЕ !!! - снова перебираем Весе БЛОКИ  <div class="goods"> и убираем сласс hide-goods
                elasticItems.forEach((element)=>{
                    element.classList.remove(`hide-goods`);
                });
              };
           };
  });
}).catch((error)=>{
  console.log(`404 - страница не найдена, ${error}`);
});




