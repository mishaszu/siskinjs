const $ = {}
$.render = function(f, _) {
  _[f.name] = f({_:_})
  return Object.assign(
    {_:_}
  )
}
$.display = function(toDisplay) {
  document.getElementById('app').appendChild(toDisplay)
}
$.div = function(toAppend) {
  const args = arguments
  const div = document.createElement('DIV')
  div.appendChild(toAppend)
  return div
}
$.p = function(toAppend) {
  const p = document.createElement('P')
  const text = document.createTextNode(toAppend)
  p.appendChild(text)
  return p
}

var test = DOM_pipe(main, sub1, sub1sub1, sub1sub2)
test()

function DOM_pipe() {
  const args = arguments;
  return function() {
    let _ = {},
        x
    for(var p = args.length-1; p >= 0; p--) {
      x = $.render(args[p],_)
    }
    $.display(x._.main())
  }
}

function main({_}) {
  const {sub1} = _
  return function() {
    return $.div(sub1())
  }
}

function sub1({_}) {
  const {sub1sub1, sub1sub2} = _
  return function() {
    return $.p(sub1sub1(" + ")  + sub1sub2())
  }
}

function sub1sub1() {
  return (param) => {
    return "jeden" + param
  }
}

function sub1sub2() {
  return () => {
    return "dwa"
  }
}
