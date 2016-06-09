const sinon = require('sinon')

exports.logWatch = (func, ...args) => {
  const spy = sinon.spy()
  const origLog = console.log
  console.log = spy

  func(...args)
  console.log = origLog

  return spy.args[0]
}
