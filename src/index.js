import _ from 'lodash'
import $ from 'jquery'
import { ui } from './jquery.ul'

const dom = $('<div>')
dom.html(_.join(['yang', 'zai'], '***'))
$('body').append(dom)
ui()