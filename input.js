class Input {
  constructor(setValue) {
    this.setValue = setValue
    // 기본 setValue
    switch (setValue.inputType) {
      default: case 'id':
        setValue.inputHint = 'ID 입력'
        setValue.inputClass = 'id'
        setValue.rightButton = '초기화'
        setValue.rightButtonFc = 'reset'
        setValue.maxText = setValue.maxText || 4;
        break;
      case 'price':
        setValue.inputHint = '0'
        setValue.inputClass = 'price'
        setValue.rightButton = '전액'
        setValue.rightButtonFc = 'full'
        setValue.minAmount = setValue.minAmount || 1000
        setValue.maxAmount = setValue.maxAmount || 70000;
        break;
      case 'etc':
        setValue.inputHint = '0'
        setValue.inputClass = 'etc'
        setValue.rightButton = '초기화'
        setValue.rightButtonFc = 'reset'
        break;
      case 'connect':
        setValue.inputClass = 'connect'
        setValue.rightButton = '초기화'
        setValue.rightButtonFc = 'reset'
        setValue.inputBox = setValue.inputBox || 6
        setValue.text = setValue.text || '인증번호를 입력해주세요'
        break;
      case 'password':
        setValue.inputClass = 'password'
        setValue.rightButton = '초기화'
        setValue.rightButtonFc = 'reset'
        setValue.inputBox = setValue.inputBox || 4
        setValue.isShow = setValue.isShow || false
        setValue.text = setValue.text || '비밀번호를 입력해주세요'
        break;
      case 'phone':
        setValue.inputHint = '000-0000-0000'
        setValue.inputClass = 'phone'
        setValue.rightButton = '010'
        setValue.rightButtonFc = '010'
        setValue.supportNum = ['010', '011', '016', '017', '018', '019']
        break;
    }
    this.render()
    this.event()
  }
}

Input.prototype.event = function () {
  // 기본 변수
  var parentObj = this
  var buttons = this.setValue.renderLoc.querySelectorAll('button[data-number]')
  var inputField = this.setValue.renderLoc.querySelector('.input-value').querySelector('strong')
  var hintText = this.setValue.renderLoc.querySelector('.input-value').querySelector('.placeholder')
  var resetIcon = this.setValue.renderLoc.querySelector('.input-value').querySelector('[data-number="reset"]')
  var nextButton = document.querySelector('.next')
  var agreeButton = document.querySelector('input[class="agree"]')
  var detailView = document.querySelector('.detail')
  // 금액 변수
  var inputAmount = '0'
    ? ''
    : parseInt(inputAmount)
  var defaultText = this.setValue.inputType === 'price'
    ? `최대 <span>${this.amountFormat(this.setValue.maxAmount)}원</span> 기부 가능해요`
    : ''
  var overText = `최대 기부 가능 금액을 <span>초과</span> 했어요`
  var underText = `최소 기부 가능 금액은 <span>${parentObj.setValue.minAmount}원</span> 입니다.`
  var amountRange = this.setValue.renderLoc.querySelector('.guide')
  // 비번,인증번호 변수
  var inputBoxLoc = 0
  var inputBoxs = this.setValue.renderLoc.querySelector('.input-value').querySelectorAll('strong')
  // 폰번호 변수
  var inputNum = ''

  buttons.forEach(function (el) {
    el.addEventListener('click', function (e) {
      document.querySelector('.prev').classList.add('fade-in')
      clickButton = e.target.getAttribute('data-number')
      switch (parentObj.setValue.inputType) {

        default: case 'id':
          if (clickButton === 'reset') resetField(parentObj.setValue.inputType)
          else if (clickButton === 'delete') {
            inputField.innerText = inputField.innerText.slice(0, inputField.innerText.length - 1)
            if (inputField.innerText.length === 0) resetField(parentObj.setValue.inputType);
          }
          else if (inputField.innerText.length < parentObj.setValue.maxText) {
            activeField(parentObj.setValue.inputType)
            inputField.innerText += e.target.getAttribute('data-number')
          }
          createNextButton()
          break;

        case 'price':
          if (clickButton === 'reset') resetField(parentObj.setValue.inputType)
          else if (clickButton === 'full') {
            inputAmount = parentObj.setValue.maxAmount.toString()
            activeField(parentObj.setValue.inputType)
          }
          else if (clickButton === 'delete') {
            amountRange.classList.remove('error')
            inputAmount = inputAmount.slice(0, inputAmount.length - 1)
            if (inputAmount.length < 1) resetField(parentObj.setValue.inputType);
          }
          else if (inputAmount === '' && clickButton === '0') {
            alert('0원 이상을 입력해 주세요.')
            resetField(parentObj.setValue.inputType);
          }
          else if (inputAmount <= parentObj.setValue.maxAmount) {
            activeField(parentObj.setValue.inputType)
            inputAmount += clickButton
          }
          inputField.innerText = parentObj.amountFormat(inputAmount)
          amountAlert()
          createNextButton()
          break;

        case 'etc':
          if (clickButton === 'reset') resetField(parentObj.setValue.inputType)
          else if (clickButton === 'delete') {
            inputField.innerText = inputField.innerText.slice(0, inputField.innerText.length - 1)
            if (inputField.innerText.length === 0) resetField(parentObj.setValue.inputType)
          }
          else if (inputField.innerText === '' && clickButton === '0') {
            alert('0 이상의 수량을 입력해 주세요.')
            resetField(parentObj.setValue.inputType)
          }
          else {
            activeField(parentObj.setValue.inputType)
            inputField.innerText += clickButton
          }
          createNextButton()
          break;

        case 'connect': case 'password':
          if (clickButton === 'reset') {
            inputBoxs.forEach(function (el) {
              el.innerText = ''
              if (parentObj.setValue.isShow === false) el.classList.remove('hidden');
              inputBoxLoc = 0
            })
          }
          else if (clickButton === 'delete') {
            if (inputBoxLoc > 0) {
              inputBoxs[inputBoxLoc - 1].innerText = ''
              if (parentObj.setValue.isShow === false) inputBoxs[inputBoxLoc - 1].classList.remove('hidden');
              inputBoxLoc--
            }
          }
          else if (inputBoxLoc < parentObj.setValue.inputBox) {
            if (parentObj.setValue.isShow === false) {
              var saveLoc = inputBoxs[inputBoxLoc];
              setTimeout(function () {
                saveLoc.classList.add('hidden');
              }, 100)
            }
            inputBoxs[inputBoxLoc].innerText += clickButton
            inputBoxLoc++
          }
          createNextButton()
          break;

        case 'phone':
          if (clickButton === 'reset') resetField(parentObj.setValue.inputType)
          else if (clickButton === 'delete') {
            inputNum = inputNum.slice(0, inputNum.length - 1)
            if (inputField.innerText.length <= 1) resetField(parentObj.setValue.inputType);
          }
          else if (inputField.innerText.length <= 12) {
            activeField(parentObj.setValue.inputType)
            inputNum += clickButton
            if (inputNum.length > 11) inputNum = inputNum.slice(0, 11);
          }
          insertHipen()
          createNextButton()
          break;
      }
    })
  })

  if (agreeButton !== null) {
    agreeButton.addEventListener('click', function () {
      switch (parentObj.setValue.inputType) {
        case 'phone': createNextButton()
      }
    });
  }

  if (detailView !== null) {
    detailView.addEventListener('click', function () {
      if (document.querySelectorAll('.popup').length > 0) document.querySelector('.popup').remove()
      var popup = document.createElement('aside')
      popup.classList.add('popup')
      popup.innerHTML = parentObj.privacyPopup()
      document.querySelector('body').append(popup)
      console.log('')
      setTimeout(function () {
        document.querySelector('.popup').classList.add('is-open')
      }, 0)
      document.querySelector('.btn-close').addEventListener('click', function () {
        document.querySelector('.popup').classList.remove('is-open')
      })
    })
  }

  //내부함수
  function resetField(inputType) {
    inputField.innerText = ''
    hintText.classList.remove('hide')
    resetIcon.classList.add('hide')
    if (inputType === 'price') {
      inputAmount = '';
      inputField.classList.remove('unit')
      amountRange.classList.remove('error')
      amountRange.innerHTML = defaultText
    }
    else if (inputType === 'etc') inputField.classList.remove('unit')
    else if (inputType === 'phone') inputNum = ''
  }

  function activeField(inputType) {
    hintText.classList.add('hide')
    resetIcon.classList.remove('hide')
    if (inputType === 'price') {
      inputField.classList.add('unit')
      amountRange.classList.remove('error')
      amountRange.innerHTML = defaultText
    }
    else if (inputType === 'etc') inputField.classList.add('unit')
  }

  function createNextButton() {
    switch (parentObj.setValue.inputType) {
      default: case 'id':
        inputField.innerText.length === parentObj.setValue.maxText
          ? createCondition(true)
          : createCondition(false);
        break;
      case 'price':
        inputAmount <= parentObj.setValue.maxAmount && inputAmount >= parentObj.setValue.minAmount && inputAmount !== ''
          ? createCondition(true)
          : createCondition(false);
        break;
      case 'etc':
        inputField.innerText.length > 0
          ? createCondition(true)
          : createCondition(false);
        break;
      case 'connect': case 'password':
        inputBoxs[parentObj.setValue.inputBox - 1].innerText !== ''
          ? createCondition(true)
          : createCondition(false);
        break;
      case 'phone':
        inputNum.length >= 10 && agreeButton.checked === true
          ? createCondition(true)
          : createCondition(false);
        break;
    }
  }

  function createCondition(condition) {
    if (condition) {
      nextButton.classList.add('fade-in')
      nextButton.removeAttribute('disabled')
    }
    else {
      nextButton.classList.remove('fade-in')
      nextButton.setAttribute('disabled', 'true')
    }
  }

  function amountAlert() {
    if (inputAmount !== '' && inputAmount < parentObj.setValue.minAmount) {
      amountRange.classList.add('error')
      amountRange.innerHTML = underText
    }
    else if (inputAmount > parentObj.setValue.maxAmount) {
      amountRange.classList.add('error')
      amountRange.innerHTML = overText
    }
    else amountRange.innerHTML = defaultText;
  }

  function insertHipen() {
    if (inputNum.length > 3 && !parentObj.setValue.supportNum.includes(inputNum.slice(0, 3))) {
      alert('휴대폰 앞자리는 ' + parentObj.setValue.supportNum.join(',') + ' 만 입력해 주세요.')
      resetField(parentObj.setValue.inputType)
    }
    else if (inputNum.length >= 7) {
      var hyphenHandling = inputNum.slice(0, 3) + '-' + inputNum.slice(3, inputNum.length - 4) + '-' + inputNum.slice(inputNum.length - 4, inputNum.length)
      inputField.innerText = hyphenHandling.replace('--', '-')
    }
    else inputField.innerText = inputNum
  }
}

Input.prototype.amountFormat = function (number) {
  var number = number.toString()
  var showNumber = number
  var commas = 0
  for (i = 1; i < number.length / 3; i++) {
    var sliceComma = showNumber.slice(-3 * i - commas, showNumber.length)
    var addComma = "," + sliceComma
    var frontNumber = showNumber.slice(0, showNumber.length - 3 * i - commas)
    var mergeValue = frontNumber + addComma
    showNumber = mergeValue
    commas++
  }
  return showNumber
}

Input.prototype.privacyPopup = function () {
  var privacyPopupHTML =
    `<header>
    <h1>개인정보 수집 및 이용 내용.</h1>
    </header>
    <footer>
    <button class="btn-close">확인</button>
    </footer>
    `
  return privacyPopupHTML
}

Input.prototype.createInputField = function () {
  var defaultField = `
  <span class='placeholder'>${this.setValue.inputHint}</span>
  <strong></strong>
  <button class="hide" data-number="reset">X</button>
  `
  var bottomText = ``
  switch (this.setValue.inputType) {
    case 'price':
      bottomText = `<p class="guide">최대 <span>${this.amountFormat(this.setValue.maxAmount)}원</span> 기부 가능해요</p>`
      break;
    case 'connect': case 'password':
      defaultField = ``
      for (i = 0; i < this.setValue.inputBox; i++) {
        defaultField += `<strong data-input-number="${i}"></strong>`
      }
      bottomText = `<p class="guide">${this.setValue.text}</p>`
      break;
    case 'phone':
      bottomText = `<p class='guide'><input type="checkbox" class="agree">(필수) 개인정보 수집 및 이용에 동의합니다.<a href="#" class="detail">자세히보기</a></p>`
  }
  return `
  <input type="hidden">
  <div class="input-value">
    ${defaultField}
  </div>
  ${bottomText}
  `
}

Input.prototype.render = function () {
  var keypad = ``
  for (i = 1; i <= 12; i++) {
    switch (i) {
      case 10:
        keypad += `<li><button data-number=${this.setValue.rightButtonFc}>${this.setValue.rightButton}</button></li>`
        break;
      case 11:
        keypad += `<li><button data-number="0">0</button></li>`
        break;
      case 12:
        keypad += `<li><button data-number="delete">지움</button></li>`
        break;
      default:
        keypad += `<li><button data-number=${i}>${i}</button></li>`
    }
  }
  this.setValue.renderLoc.innerHTML = `
    <div class="input-box ${this.setValue.inputClass}">
    <input type="hidden">
      ${this.createInputField()}
    </div>
    <ul class="input-btn">
      ${keypad}
    </ul>
    `
}