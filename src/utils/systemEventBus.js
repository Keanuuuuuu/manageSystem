const listeners = {}

export default {
  // 监听某个事件
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
  // 触发（抛出）这个事件的功能
  $emit(eventName, ...args){
    if(!listeners[eventName]){
      return
    }
    for(const handler of listeners[eventName]){
      handler(...args)
    }
  }
}