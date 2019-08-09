const item = document.querySelector('.result')
const copy = document.querySelector('.copy')

copy.addEventListener('click', copy_to_board)

function copy_to_board(e) {
  item.select()
  document.execCommand("Copy")
  alert('已完成複製!請試試看黏貼!')
}
