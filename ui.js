const defaultKeyboard = [
    {char: 'а'},
    {char: 'б'},
    {char: 'в'},
    {char: 'г'},
    {char: 'д'},
    {char: 'е'},
    {char: 'ж'},
    {char: 'з'},
    {char: 'и'},
    {char: 'й'},
    {char: 'к'},
    {char: 'л'},
    {char: 'м'},
    {char: 'н'},
    {char: 'о'},
    {char: 'п'},
    {char: 'р'},
    {char: 'с'},
    {char: 'т'},
    {char: 'у'},
    {char: 'ф'},
    {char: 'х'},
    {char: 'ц'},
    {char: 'ч'},
    {char: 'ш'},
    {char: 'щ'},
    {char: 'ъ'},
    {char: 'ы'},
    {char: 'ь'},
    {char: 'э'},
    {char: 'ю'},
    {char: 'я'},
  ];
  
  //http://free-generator.ru/words.html
const dictionary = [
    'эльф',
    'коллега',
    'почва',
    'паразит',
    'штык',
    'запрос',
    'камин',
    'павильон',
    'скорода',
    'элита',
    'мочалка',
    'покупатель',
    'причина',
    'нога',
    'встреча',
    'налог',
    'слово',
    'преступление',
    'известие',
    'случай',
    'поле',
    'изделие',
    'контакт',
    'сентябрь',
    'оборудование',
    'фотография',
    'решение',
    'фигура',
    'вещество',
    'убийство',
    'кулак',
    'администрация',
    'капитал',
    'герой',
    'мощность',
    'пункт',
    'машина',
    'сознание',
    'солдат',
    'исключение',
    'искусство',
    'зависимость',
    'деньга',
    'мясо',
    'работник',
    'возможность',
    'камень',
    'автор',
    'проблема',
    'деталь'
  ];
//=========================================================================


//=========================================    =========================
// Изначально рисовать пустую виселицу      UI
// - 1 добавляется голова
// - 1 добавляется тело
// - 1 добавляется левая рука
// - 1 добавляется правая рука
// - 1 добавляется левая нога
// - 1 добавляется правая нога
// - 1 game over

const canvas = document.getElementsByTagName("canvas")[0];
const canvasContext = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 220;

function drawPerson(errorsCount) {
  canvasContext.clearRect(0, 0, 100, canvas.height);
  canvasContext.fillRect(5, 140, 80, 10);
  canvasContext.fillRect(7, 10, 5, 130);
  canvasContext.lineWidth = 3;

  canvasContext.beginPath();
  canvasContext.strokeStyle = 'black';
  if(errorsCount > 0) {
    // стойка
    canvasContext.fillRect(10, 15, 40, 3);
    canvasContext.fillRect(40, 15, 2, 10);
  }

  if(errorsCount > 1) {
    // голова
    canvasContext.arc(41, 40, 15, 0, 360);

    canvasContext.moveTo(35, 33);
    canvasContext.arc(35, 35, 1, 0, 360);

    canvasContext.moveTo(47, 33);
    canvasContext.arc(47, 35, 1, 0, 360);

    canvasContext.moveTo(49, 50);
    canvasContext.arc(41, 55, 10, -(Math.PI * 0.2), Math.PI + (Math.PI * 0.2), true);
  }

  if(errorsCount > 2) {
    // тело
    canvasContext.moveTo(41, 55);
    canvasContext.lineTo(41, 95);
  }

  if(errorsCount > 3) {
    // левая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(30, 80);
  }

  if(errorsCount > 4) {
    // правая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(52, 80);
  }

  if(errorsCount > 5) {
    // левая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(30, 120);
  }

  if(errorsCount > 6) {
    // правая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(52, 120);
  }
  canvasContext.stroke();
}

function drawBoard(lettersState) {
  canvasContext.font = "35px serif";
  const leftPadding = 120;
  const lettersInLine = 8;
  canvasContext.lineWidth = 2;
  canvasContext.clearRect(leftPadding - 10, 0, canvas.width - leftPadding, canvas.height - 60);
  
  for(let i = 0; i < lettersState.length; i++) {
    const currentLetter = lettersState[i];
    const yPosition = 35 * Math.floor((i / lettersInLine) + 1);
    const xPosition = leftPadding + i % lettersInLine * 35;
    canvasContext.fillText(currentLetter.char, xPosition, yPosition);

    if(currentLetter.success) {
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'green';
      canvasContext.moveTo(xPosition + 25, yPosition - 10);
      canvasContext.arc(xPosition + 10, yPosition - 8, 15, 0, 360);
      canvasContext.stroke();
    }

    if(currentLetter.error) {
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'red';
      canvasContext.moveTo(xPosition, yPosition - 15);
      canvasContext.lineTo(xPosition + 15, yPosition);
      canvasContext.moveTo(xPosition + 15, yPosition - 15);
      canvasContext.lineTo(xPosition, yPosition);
      canvasContext.stroke();
    }
  }
}

function setDefaultKeyboard() {
  return JSON.parse(JSON.stringify(defaultKeyboard));
}

function drawAnswerState(answerState) {
  const xPosition = 100;
  const yPosition = 180;
  canvasContext.clearRect(xPosition, yPosition-30, canvas.width - xPosition, 40);
  canvasContext.font = "40px serif";
  canvasContext.fillText(answerState, xPosition, yPosition);
}

function winGame() {
  setTimeout(() => {
    alert("Победа 🎉");
    startGame();
  });
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLocaleLowerCase();
  if(lettersState.map(key => key.char).includes(key)) {
    onKeyClick(key);
  }

  if(['escape', 'enter'].includes(key)){
    startGame();
  }
});
//==================================================       ===============
//                                                   LOGIC

let answer = '';
let answerState = '';
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {

 mistakesCount = 0;
 lettersState = setDefaultKeyboard();
 drawPerson(0);
 drawBoard(lettersState);
 generateWord();
}

function generateWord() {

answer = dictionary[Math.floor(Math.random() * dictionary.length)];

 answerState = '*'.repeat(answer.length);
 drawAnswerState(answerState);

}

function onKeyClick(letter) {

 if (mistakesCount === 7){
   alert('Конец игры');
   startGame();
   return;
 }

 let letterFromState;
 for(let i = 0; i < lettersState.length; i++){
   if (letter === lettersState[i].char){
     letterFromState = lettersState[i];
      break;
   }
 }
 /*
 2. В состоянии клавиатуры (lettersState) найдите кликнутый символ 
(letter). Найденый объект сохраняйте в отдельную переменную (например letterFromState)
*/

 if(!letterFromState.error && !answer.includes(letter)) {
   mistakesCount++;
   letterFromState.error = true;  
 } 

 if (!letterFromState.success && answer.includes(letter)){
   letterFromState.success = true;
   let charsArray = answerState.split('');
   for (let i = 0; i < answer.length; i++) {
     if (letter === answer[i]){
       charsArray[i] = letter;
     }
   }
   answerState = charsArray.join('');
 }


 /*
 4. Проверьте: присутсвует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как успешный (success)
 4.1. Отметьте символ свойством success
 4.2. Измените необходимые символы "*" на кликнутый символ. Изменения необходимо выполнять только символов, у которых позиция в ответе совпадает с позицией состояния.
 Пример: 
 - Состояние игры: '**********'
 - Загаданное слово: "фотография"
 - Пользователь кликает на "о"
 - Состояние должно измениться на: '*о*о******'
 - Пользователь кликает на "ф"
 - Состояние должно измениться на: 'фо*о***ф**'
 - Пользователь кликает на "т"
 - Состояние должно измениться на: 'фото***ф**'
*/
drawPerson(mistakesCount);
drawBoard (lettersState);
drawAnswerState (answerState);

 if (answer == answerState) {
   winGame();
 }
 /*
 5. Перерисовывайте состояние игрока с текущим количеством жизней

 6. Перерисовывайте состояние клавиатуры

 7. Перерисовывайте состояние отгаданного слова

 8. Проверьте, совпадает ли состояние отгаданного слова с ответом игры
 8.1. Отображайте победу игрока, если пользователь угадал слово
 */
}