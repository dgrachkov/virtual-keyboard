// Получаем клавиши и поля ввода
const keys = document.querySelectorAll('.keyboard-key'),
      space = document.querySelector('.space'),
      shifts = document.querySelectorAll('.shift'),
      enter = document.querySelector('.enter'),
      tab = document.querySelector('.tab'),
      backspace = document.querySelector('.backspace'),
      lang = document.querySelector('.lang');

const textarea = document.querySelector('#textarea'),
      btnVolume = document.querySelector('.btn-volume'),
      btnCopy = document.querySelector('.btn-copy'),
      btnTrash = document.querySelector('.btn-trash');
      

// Атрибуты для клавиш
for (let i = 0; i < keys.length; i++) {
  if (keys[i].hasAttribute('specialkey') === false && keys[i].hasAttribute('uppersymbol') === false) {
    keys[i].setAttribute('upperkey', keys[i].innerHTML.toUpperCase());
    keys[i].setAttribute('lowerkey', keys[i].innerHTML.toLowerCase());
  }
}


// Event нажатие кнопок
window.addEventListener('keydown', (e) => {
  for (let i = 0; i < keys.length; i++) {
    if (e.key == keys[i].getAttribute('upperkey') || e.key == keys[i].getAttribute('lowerkey') ||
        e.key == keys[i].getAttribute('specialkey') || e.key == keys[i].getAttribute('lowersymbol') || 
        e.key == keys[i].getAttribute('uppersymbol') || e.key == keys[i].getAttribute('en-key') || e.key == keys[i].getAttribute('en-upperkey')) {
      keys[i].classList.add('active');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('en-key')) {
      keys[i].innerHTML = keys[i].getAttribute('en-upperkey');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('lowerkey')) {
      keys[i].innerHTML = keys[i].getAttribute('upperkey');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('lowersymbol')) {
      keys[i].innerHTML = keys[i].getAttribute('uppersymbol');
    }
  }
});

window.addEventListener('keyup', (e) => {
  for (let i = 0; i < keys.length; i++) {
    if (e.key == keys[i].getAttribute('upperkey') || e.key == keys[i].getAttribute('lowerkey') ||
        e.key == keys[i].getAttribute('specialkey') || e.key == keys[i].getAttribute('lowersymbol') ||
        e.key == keys[i].getAttribute('uppersymbol') || e.key == keys[i].getAttribute('en-key') || e.key == keys[i].getAttribute('en-upperkey')) {
      keys[i].classList.remove('active');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('en-upperkey')) {
      keys[i].innerHTML = keys[i].getAttribute('en-key');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('upperkey')) {
      keys[i].innerHTML = keys[i].getAttribute('lowerkey');
    }

    if (e.key == 'Shift' && keys[i].innerHTML == keys[i].getAttribute('uppersymbol')) {
      keys[i].innerHTML = keys[i].getAttribute('lowersymbol');
    }
  }
})


// Вверхний регистр нажатием на shift
for (const shift of shifts) {
  shift.addEventListener('click', () => {
    let checkShift = shift.toggleAttribute('checkshift')
    for (let i = 0; i < keys.length; i++) {
      if (checkShift === false && keys[i].innerHTML == keys[i].getAttribute('en-key')) {
        keys[i].innerHTML = keys[i].getAttribute('en-upperkey')
      } else if (checkShift === true && keys[i].innerHTML == keys[i].getAttribute('en-upperkey')) {
        keys[i].innerHTML = keys[i].getAttribute('en-key')
      }

      if (checkShift === false && keys[i].innerHTML == keys[i].getAttribute('lowerkey')) {
        keys[i].innerHTML = keys[i].getAttribute('upperkey')
      } else if (checkShift === true && keys[i].innerHTML == keys[i].getAttribute('upperkey')) {
        keys[i].innerHTML = keys[i].getAttribute('lowerkey')
      }

      if (checkShift === false && keys[i].innerHTML == keys[i].getAttribute('lowersymbol')) {
        keys[i].innerHTML = keys[i].getAttribute('uppersymbol')
      } else if (checkShift === true && keys[i].innerHTML == keys[i].getAttribute('uppersymbol')) {
        keys[i].innerHTML = keys[i].getAttribute('lowersymbol')
      }
    }
  })  
}


// Переключение языка 
lang.addEventListener('click', () => {
  let checkLang =  lang.toggleAttribute('checklang')
  for (let i = 0; i < keys.length; i++) {
    if (checkLang === false && keys[i].hasAttribute('en-key')) {
      keys[i].innerHTML = keys[i].getAttribute('en-key')
    }
    if (checkLang === true && keys[i].hasAttribute('en-key')) {
      keys[i].innerHTML = keys[i].getAttribute('lowerkey')
    }

    if (keys[i].innerHTML == keys[i].getAttribute('en-key')) {
      space.innerHTML = 'en'
    } else if (keys[i].innerHTML == keys[i].getAttribute('lowerkey')) {
      space.innerHTML = 'ru'
    }
  }
})


// Работа с btn-area
btnVolume.addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(textarea.value);
  speechSynthesis.speak(utterance);
})

btnTrash.addEventListener('click', () => {
  textarea.value = '';
})

const modalCopied = document.querySelector('.modal_copied');

btnCopy.addEventListener('click', () => {
  modalCopied.style.display = 'inline';
  setTimeout(() => {
    modalCopied.style.display = 'none';
  }, 350);
  textarea.select();    
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
})


// Специальные клавиши
for (const key of keys) {
  if (key.hasAttribute('specialkey') === false) {
    key.addEventListener('click', () => {
      textarea.value += key.innerHTML;
    })
  }
}

backspace.addEventListener('click', () => {
  let textStr = textarea.value,
      textRemove = textStr.substring(0, textStr.length - 1);

  textarea.value = textRemove;
})

space.addEventListener('click', () => {
  textarea.value += ' ';
})

tab.addEventListener('click', () => {
  textarea.value += '    ';
})

enter.addEventListener('click', () => {
  textarea.value += `
`;
})








