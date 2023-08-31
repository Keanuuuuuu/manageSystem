const listeners = {}

// 自己来做一个事件总线对象：

export default {
  // 首先它需要有监听某个事件的功能
  $on(eventName, handler){
    if(!listeners[eventName]){
      listeners[eventName] = new Set()
    }
    listeners[eventName].add(handler)
  },
  $off(eventName, handler){
    if(!listeners[eventName]){
      return
    }
    listeners[eventName].delete(handler)
  },
  // 需要有触发（抛出）这个事件的功能，当事件触发，监听该事件的模块与组件需要做出动作
  $emit(eventName, ...args){
    if(!listeners[eventName]){
      return
    }
    for(const handler of listeners[eventName]){
      handler(...args)
    }
  }
}