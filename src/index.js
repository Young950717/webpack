import _ from 'lodash'
import $ from 'jquery'


const dom = $('<div>')
dom.html(_.join(['yang', 'zai'], '***'))
$('body').append(dom)