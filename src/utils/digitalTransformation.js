// 将输入的字符串转换为特定的数值数组 空调对应的模式
// 用于实时控制的转换函数
export function switchString(...items) {
    let res = []
    if(items[0] === '开'){
        res[0] = 1
    }else {
        res[0] = 0
    }

    if(items[1] === '制冷'){
        res[1] = 2
    }else if(items[1] === '制热'){
        res[1] = 1
    }else if(items[1] === '送风'){
        res[1] = 4
    }else if(items[1] === '除湿'){
        res[1] = 8
    }

    if(items[2] === '自动'){
        res[2] = 0
    }else if(items[2] === '低速'){
        res[2] = 1
    }else if(items[2] === '中速'){
        res[2] = 2
    }else if(items[2] === '高速'){
        res[2] = 3
    }

    res[3] = items[3]

    res[3] = parseInt(items[3])

    return res
}

// 用于智能控制的转换函数
export function switchStringIntelligentTime(items) {
    console.log(items.length);
    let res = [{},{}]
    if(items.length === 0){
        return []
    }else if(items.length === 1){
        res = [{}]
    }
    let flag = 0;
    items.forEach((element, index)=>{
        console.log(index);
        res[index].temperature = parseInt(element.numValue) === 0?null:parseInt(element.numValue)
        res[index].time = element.firstTime
        if(element.switchValue === '开'){
            res[index].status = 1
        }else if(element.switchValue === '关'){
            res[index].status = 0
        }else{
            res[index].status = null
        }

        if(element.modeValue === '制冷'){
            res[index].model = 2
        }else if(element.modeValue === '制热'){
            res[index].model = 1
        }else if(element.modeValue === '送风'){
            res[index].model = 4
        }else if(element.modeValue === '除湿'){
            res[index].model = 8
        }else{
            res[index].model = null
        }

        if(element.windValue === '自动'){
            res[index].windSpeed = 0
        }else if(element.windValue === '低速'){
            res[index].windSpeed = 1
        }else if(element.windValue === '中速'){
            res[index].windSpeed = 2
        }else if(element.windValue === '高速'){
            res[index].windSpeed = 3
        }else{
            res[index].model = null
        }
        if(res[index].status = null || res[index].temperature === null || res[index].model === null || res[index].model === null){
            flag++;
            res[index] = null
        }
    })
    if(flag === 2){
        res = []
    }
    return res
}

export function switchStringIntelligentTemp(items) {
    console.log(items);
    let res = [{}]
    if(items.length === 0){
        res[0] = null
        return res
    }
    items.forEach((element, index)=>{
        res[index].temperature = parseInt(element.numValue) === 0?null:parseInt(element.numValue)

        if(element.modeValue === '制冷'){
            res[index].model = 2
        }else if(element.modeValue === '制热'){
            res[index].model = 1
        }else if(element.modeValue === '送风'){
            res[index].model = 4
        }else if(element.modeValue === '除湿'){
            res[index].model = 8
        }else{
            res[index].model = null
        }

        if(element.windValue === '自动'){
            res[index].windSpeed = 0
        }else if(element.windValue === '低速'){
            res[index].windSpeed = 1
        }else if(element.windValue === '中速'){
            res[index].windSpeed = 2
        }else if(element.windValue === '高速'){
            res[index].windSpeed = 3
        }else{
            res[index].model = null
        }

        if(res[index].temperature === null || res[index].model === null || res[index].model === null){
            res[index] = null
        }
    })

    return res
}

// 用于智能控制的逆转换函数
export function switchStringIntelligentTimeReverse(items) {
    let res = [{},{}]
    if(items.length === 0){
        return []
    }else if(items.length === 1){
        res = [{}]
    }
    items.forEach((element, index)=>{
        res[index].numValue = parseInt(element.temperature)
        res[index].firstTime = element.time
        if(element.status === 1){
            res[index].switchValue = '开'
        }else if(element.status === 0){
            res[index].switchValue = '关'
        }

        if(element.model === 2){
            res[index].modeValue = '制冷'
        }else if(element.model === 1){
            res[index].modeValue = '制热'
        }else if(element.model === 4){
            res[index].modeValue = '送风'
        }else if(element.model === 8){
            res[index].modeValue = '除湿'
        }

        if(element.windSpeed === 0){
            res[index].windValue = '自动'
        }else if(element.windSpeed === 1){
            res[index].windValue = '低速'
        }else if(element.windSpeed === 2){
            res[index].windValue = '中速'
        }else if(element.windSpeed === 3){
            res[index].windValue = '高速'
        }
    })
    return res
}

export function switchStringIntelligentTempReverse(items) {
    let res = [{}]
    if(items === null){
        return [{}]
    }
    res[0].numValue = parseInt(items.temperature)
    if(items.model === 2){
        res[0].modeValue = '制冷'
    }else if(items.model === 1){
        res[0].modeValue = '制热'
    }else if(items.model === 4){
        res[0].modeValue = '送风'
    }else if(items.model === 8){
        res[0].modeValue = '除湿'
    }

    if(items.windSpeed === 0){
        res[0].windValue = '自动'
    }else if(items.windSpeed === 1){
        res[0].windValue = '低速'
    }else if(items.windSpeed === 2){
        res[0].windValue = '中速'
    }else if(items.windSpeed === 3){
        res[0].windValue = '高速'
    }
    return res
}