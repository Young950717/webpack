// import test from './test'
// console.log(test.name)

import _ from 'lodash'
import $ from 'jquery'
const el = document.createElement('div')
el.innerHTML = _.join(['Yang', 'Zai'], '-')
document.body.appendChild(el)

// function getComponent () {
//   return import(/* webpackChunkName: 'loadsh' */ 'lodash').then(({ default: _ }) => {
//     const el = document.createElement('div')
//     el.innerHTML = _.join(['Yang', 'Zai'], '-')
//     return el
//   })
// }

// getComponent().then(el => {
//   document.body.appendChild(el)
// })