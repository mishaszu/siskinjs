const $ = {}

/**
 * render saves components in main object
 * use only with DOM pipe
 */
$.render = function(f, _) {
  _[f.name] = f({_:_})
  return _
}

$.display = function(toDisplay) {
  /* TODO for updating and rerendering I need to associate html elements returned from components with main childnodes */
  console.log(toDisplay.childNodes)
  document.getElementById('app').appendChild(toDisplay)
}

function DOM_pipe() {
  const args = arguments;
  return function() {
    let _ = {},
        x
    for(var p = args.length-1; p >= 0; p--) {
      x = $.render(args[p],_)
    }
    $.display(x.main())
  }
}


/**
 *siskin render section with HTML components
 */
$.div = function() {
  if (!arguments.length) {
    return false 
  }
  const args = arguments
  const div = document.createElement('DIV')
  for (let i = 0; i < arguments.length; i++) {
    div.appendChild(args[i])
  }
  return div
}
$.p = function(toAppend) {
  const p = document.createElement('P')
  const text = document.createTextNode(toAppend)
  p.appendChild(text)
  return p
}

/**
 * function for inline styling elements with html DOM convenction
 * TODO add way to style by adding new document stylesheet
 */
$.style = function(element, style) {
  for(let guide in style) {
    element.style[guide] = style[guide]
  }
  return element
}

var test = DOM_pipe(main, sub1, sub1sub1, sub1sub2)
test()

/**
 * Components
 */
function main({_}) {
  const {sub1} = _
  return function() {
    return $.div(
      sub1(),
      $.style(
        $.div(
          $.style($.p('test'),
            {color: 'yellowgreen'}
          )
        ),
        {
          marginLeft: "30px",
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100px",
          height: "50px",
          textAlign: "center",
          lineHeight: "50px"
        }
      )
    )
  }
}

function sub1({_}) {
  const {sub1sub1, sub1sub2} = _
  return function() {
    return $.style(
      $.p(sub1sub1(" + ")  + sub1sub2()),
      {
        color: 'red'
      }
    )
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
