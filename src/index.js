import "@babel/polyfill"
// Tree Shaking 只支持es module引入的方式
import { add } from './main'
add(1, 2)