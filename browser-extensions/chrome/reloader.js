var port = 45729

function connect() {
  var lastConnectionAttempt = Date.now()

  var ws = new WebSocket('wss://localhost:' + port)

  ws.onmessage = function(event) {
    // todo: do nothing if this "tab" is a dev console?
    var msg = JSON.parse(event.data)
    // console.log(msg)
    if (msg.css_only) chrome.tabs.executeScript(null, {file: "reload-css.js"})
    else chrome.tabs.reload()
  }

  function reconnect(err) {
    // console.log("reconnecting")
    if ((Date.now() - lastConnectionAttempt) > 1000) connect()
    else setTimeout(connect, 1000)
  }

  ws.onerror = reconnect
  ws.onclose = reconnect
}

connect()
