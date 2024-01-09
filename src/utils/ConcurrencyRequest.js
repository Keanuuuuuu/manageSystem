// 限制并发请求

export default class ConcurrencyRequest{
  constructor({maxControlNumber}){
    this.maxControlNumber = maxControlNumber;
    this.taskQueue = [];
    this.response = {};

    setTimeout(()=>{
      console.log(this.taskQueue);
      this._runForTask()
    })
  }

  push(task){
    this.taskQueue.push(task);
  }

  _runForTask(){
    if(!this.taskQueue.length) return ;

    let minControlNumber;
    this.taskQueue.length < this.maxControlNumber?minControlNumber = this.taskQueue.length:minControlNumber = this.maxControlNumber;

    for (let index = 0; index < this.minControlNumber; index++) {
      const task = this.taskQueue.shift();
      this.maxControlNumber--;
      this._doRequest(task);
    }
  }

  _doRequest(task){
    task.then((res)=>{
      this.response[task] = {
        resolve: res,
        reject: null
      }
    }).catch((reson)=>{
      this.response[task] = {
        resolve: reson,
        reject: null
      }
    }).finally(()=>{
      this.maxControlNumber++;
      this._runForTask();
    })
  }

}