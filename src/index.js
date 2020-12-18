// import _ from 'lodash'
// console.log(_.join(['a', 'b', 'c']))
// console.log(_.join(['a', 'b', 'c']), '***')

function getComponent () {
  return import('lodash').then(({ default: _ }) => {
    const el = document.createElement('div')
    el.innerHTML = _.join(['Yang', 'Zai'], '-')
    return el
  })
}

getComponent().then(el => {
  document.body.appendChild(el)
})