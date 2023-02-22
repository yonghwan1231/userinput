const inputDesc = {
  id: 'ID 입력창입니다. 코드 내에서 옵션으로 입력 글자수를 설정할 수 있습니다. 글자수 만족 시 다음 페이지 이동 버튼이 생성 됩니다.',
  etc: '수량 입력창입니다. 0 이상의 숫자 입력 시 다음 페이지 이동 버튼이 생성 됩니다.',
  price: '기부금 입력창입니다. 코드 내에서 옵션으로 최소금액과 최대금액의 범위를 설정할 수 있습니다. 금액 범위에 맞게 입력 시 다음 페이지 이동 버튼이 생성 됩니다.',
  connect: '인증번호 입력창입니다. 코드 내에서 옵션으로 인증번호 입력칸 수를 설정할 수 있습니다. 입력칸을 모두 입력해야 다음 페이지 이동 버튼이 생성 됩니다.',
  password: '비밀번호 입력창입니다. 코드 내에서 입력칸 수와 입력값 노출 여부를 설정할 수 있습니다. 입력칸을 모두 입력해야 다음 페이지 이동 버튼이 생성 됩니다.',
  phone: '전화번호 입력창입니다. 휴대폰번호 앞자리는 010, 011, 016, 017, 018, 019 만 입력 가능하며 개인정보수집동의 체크와 휴대폰번호 입력 형식 만족 시 다음 페이지 이동 버튼이 생성 됩니다. '
}

document.querySelectorAll('.input-type').forEach((el) => {
  el.addEventListener('click', (e) => {
    document.querySelectorAll('.input-type').forEach((el) => {
      el.classList.remove('select')
    })
    document.querySelector('.input-desc').innerText = inputDesc[e.target.classList[1]]
    input = new Input({
      renderLoc: document.querySelector('#input'),
      inputType: e.target.classList[1]
    })
    e.target.classList.add('select')
    document.querySelector('.next').classList.remove('fade-in')
  })
})