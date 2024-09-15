

// let answer = '';
// let answerState = '';
// let mistakesCount = 0;
// let lettersState;

// startGame();

// function startGame() {

//  mistakesCount = 0;
//  lettersState = getDefaultKeyboard();

//  drawPerson(mistakesCount);
//  drawBoard(lettersState);
//  generateWord();
// }

// function generateWord() {

// answer = dictionary[Math.floor(Math.random() * dictionary.length)];

//  answerState = '*'.repeat(answer.length);
//  drawAnswerState(answerState);

// }

// function onKeyClick(letter) {

//  if (mistakesCount === 7){
//    alert('Конец игры');
//    startGame();
//    return;
//  }

//  let letterFromState;
//  for(let i = 0; i < lettersState.length; i++){
//    if (letter === lettersState[i].char){
//      letterFromState = lettersState[i];
//       break;
//    }
//  }
//  /*
//  2. В состоянии клавиатуры (lettersState) найдите кликнутый символ 
// (letter). Найденый объект сохраняйте в отдельную переменную (например letterFromState)
// */

//  if(!letterFromState.error && !answer.includes(letter)) {
//    mistakesCount++;
//    letterFromState.error = true;  
//  } 

//  if (!letterFromState.success && answer.includes(letter)){
//    letterFromState.success = true;
//    let charsArray = answerState.split('');
//    for (let i = 0; i < answer.length; i++) {
//      if (letter === answer[i]){
//        charsArray[i] = letter;
//      }
//    }
//    answerState = charsArray.join('');
//  }


//  /*
//  4. Проверьте: присутсвует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как успешный (success)
//  4.1. Отметьте символ свойством success
//  4.2. Измените необходимые символы "*" на кликнутый символ. Изменения необходимо выполнять только символов, у которых позиция в ответе совпадает с позицией состояния.
//  Пример: 
//  - Состояние игры: '**********'
//  - Загаданное слово: "фотография"
//  - Пользователь кликает на "о"
//  - Состояние должно измениться на: '*о*о******'
//  - Пользователь кликает на "ф"
//  - Состояние должно измениться на: 'фо*о***ф**'
//  - Пользователь кликает на "т"
//  - Состояние должно измениться на: 'фото***ф**'
// */
// drawPerson(mistakesCount);
// drawBoard (lettersState);
// drawAnswerState (answerState);

//  if (answer == answerState) {
//    winGame();
//  }
//  /*
//  5. Перерисовывайте состояние игрока с текущим количеством жизней

//  6. Перерисовывайте состояние клавиатуры

//  7. Перерисовывайте состояние отгаданного слова

//  8. Проверьте, совпадает ли состояние отгаданного слова с ответом игры
//  8.1. Отображайте победу игрока, если пользователь угадал слово
//  */
// }