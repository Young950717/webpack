
import you from './you.jpg'
// import style from './index.less'
import './image.less';
const createImg = function () {
  let img = new Image()
  img.src = you
  img.className = 'image'
  document.body.appendChild(img)
}

export default createImg