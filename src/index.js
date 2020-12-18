// import "@babel/polyfill"
const arr = [
  new Promise((reslove, reject) => { }),
  new Promise((reslove, reject) => { }),
  new Promise((reslove, reject) => { }),
  new Promise((reslove, reject) => { })
]

arr.forEach(i => {
  console.log(i)
})