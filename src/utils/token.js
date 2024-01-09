// token.js
function code() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function tokenFun() {
  return (code() + code() + "-" + code() + "-" + code() + "-" + code() + "-" + code() + code() + code());
}

// 充当了一个唯一标识符的角色，用于识别特定的组件实例，并确保其与事件通信时的准确性和隔离性。