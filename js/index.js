$(() => {
  setInterval(update, 1000)
})

// 시간 단위(초)당 한번씩 수행할 작업을 정의한 함수
function update() {

  // 모든 전구를 끈다.
  turnOffAll()

  // 현재 시각을 구한다.
  let date = new Date()
  let d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  // 시각에 해당하는 전구를 켠다.
  turnOnDate(d)
  turnOnHours(h)
  turnOnMinutes(m)
  turnOnSeconds(s)
}

function turnOnDate(date) {
  turnOn30(0, date)
}

function turnOnHours(hour) {

  // AM/PM
  turnOn(1, 5)
  turnOn(1, 6+Math.floor(hour / 12))

  turnOn12(2, hour % 12)
}

function turnOnMinutes(min) {
  turnOn60(4, min)
}

function turnOnSeconds(sec) {
  turnOn60(6, sec)
}

// 30진법 단위로 전구를 켠다.
function turnOn30(row, value) {

  let ten = Math.floor(value / 10)
  let one = value % 10

  // 이삼사오
  if(ten > 1) {
    turnOn(row, ten - 2)
  }

  // 십
  if(ten !== 0) {
    turnOn(row, 2)
  }

  // 일의 자리
  switch(one) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      turnOn(row, 2+one)
      break
    case 6:
    case 7:
    case 8:
    case 9:
      turnOn(row+1, one-6)
      break
  }

  // 일
  turnOn(row+1, 4)
}

// 12진법 단위로 전구를 켠다.
function turnOn12(row, value) {

  let ten = Math.floor(value / 10)
  let one = value % 10

  // 십의 자리
  switch(ten) {
    case 1:
      turnOn(row, 1) // 열
      break
  }

  // 일의 자리
  switch(one) {
    case 1:
    case 2:
    case 3:
    case 4:
      turnOn(row, one + 1)
      break
    case 5:
      turnOn(row, 6) // 다
      turnOn(row+1, 1) // 섯
      break
    case 6:
      turnOn(row+1, 0) // 여
      turnOn(row+1, 1) // 섯
      break
    case 7:
      turnOn(row+1, 2) // 일
      turnOn(row+1, 3) // 곱
      break
    case 8:
      turnOn(row+1, 0) // 여
      turnOn(row+1, 4) // 덟
      break
    case 9:
      turnOn(row+1, 5) // 아
      turnOn(row+1, 6) // 홉
      break
  }

  turnOn(row+1, 7) // 시
}

// 60진법 단위로 전구를 켠다.
function turnOn60(row, value) {

  let ten = Math.floor(value / 10)
  let one = value % 10

  // 이삼사오
  if(ten > 1) {
    turnOn(row, ten - 2)
  }

  // 십
  if(ten !== 0) {
    turnOn(row, 4)
  }

  // 일이삼사오육칠팔구
  switch(one) {
    case 0:
      break
    case 1:
    case 2:
      turnOn(row, 4 + one)
      break
    default:
      turnOn(row + 1, one - 3)
      break
  }

  turnOn(row + 1, 7) // 분 or 초
}

// 하나의 전구를 켠다.
function turnOn(r, c) {
  let row = $("#clock tr")[r]
  let col = $(row).find("td")[c]
  $(col).addClass('on')
}

// 모든 전구를 끈다.
function turnOffAll() {
  $('.on').removeClass('on')
}
