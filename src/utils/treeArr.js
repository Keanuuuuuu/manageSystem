function Test(id, realTree) {
    let treeArr = {
        "16":[
              {
                "16_201":[
                    {
                        name:"16_201_1",
                        status:"良好",
                        mode:"制冷",
                        wind_speed:"中",
                        tempetaure:16,
                        rom_tem:20,
                        err_code:0,
                        switch:"开",
                        details:"---"
                    },
                    {
                        "空调名称":"16_201_2",
                        "状态":"良好",
                        "模式":"制冷",
                        "风速":"中",
                        "温度":16,
                        "室温":20,
                        "故障码":0,
                        "智能开关":"开",
                        "详情":"---"
                    },
                    {
                        "空调名称":"16_201_3",
                        "状态":"良好",
                        "模式":"制冷",
                        "风速":"中",
                        "温度":16,
                        "室温":20,
                        "故障码":0,
                        "智能开关":"开",
                        "详情":"---"
                    }
                ]
              },
              {
                "16_202":[
                    {
                        "空调名称":"16_202_1",
                        "状态":"良好",
                        "模式":"制冷",
                        "风速":"中",
                        "温度":16,
                        "室温":20,
                        "故障码":0,
                        "智能开关":"开",
                        "详情":"---"
                    },
                    {
                        "空调名称":"16_202_2",
                        "状态":"良好",
                        "模式":"制冷",
                        "风速":"中",
                        "温度":16,
                        "室温":20,
                        "故障码":0,
                        "智能开关":"开",
                        "详情":"---"
                    },
                    {
                        "空调名称":"16_202_3",
                        "状态":"良好",
                        "模式":"制冷",
                        "风速":"中",
                        "温度":16,
                        "室温":20,
                        "故障码":0,
                        "智能开关":"开",
                        "详情":"---"
                    }
                ]
              }
          ]
      }

    // console.log(realTree);
    if(realTree){
      treeArr = realTree
      // 浅拷贝
    }

    let ans = []
    function traverseTree(tree, compare) {
        for (const key in tree) {
        if (Array.isArray(tree[key])) {
            // 当前节点是数组，继续递归遍历每个子节点
            // console.log("这里是楼栋名或层级："+key)
            if(compare === key){
                ans = tree[key]
                break;
            }
            tree[key].forEach((node) => {
              traverseTree(node, compare);
            });
        } else if (key === 'id') {
          // console.log("这里是楼栋名或层级2："+key)
            // 当前节点是叶子节点的空调名称，打印节点信息
            if(compare === tree[key]){
                ans = tree
                break;
            }
            // console.log("这里是具体的空调名称："+tree[key]);
        }
        }
    }

    // 调用函数开始遍历
    traverseTree(treeArr, id)

    function extractAirConditioners(data) {
        const airConditioners = [];
      
        function traverseTree(tree) {
          for (const key in tree) {
            if (Array.isArray(tree[key])) {
              // 当前节点是数组，继续递归遍历每个子节点
              for (const node of tree[key]) {
                traverseTree(node);
              }
            } else if (typeof tree[key] === "object" && tree[key] !== null) {
              // 当前节点是对象，继续递归遍历子节点
              traverseTree(tree[key]);
            } else if (key === "id") {
              // 当前节点是叶子节点的空调名称，将空调对象添加到结果数组
              airConditioners.push(tree);
            }
          }
        }
      
        if (Array.isArray(data)) {
          // 处理输入是数组的情况
          for (const item of data) {
            traverseTree(item);
          }
        } else if (typeof data === "object" && data !== null) {
          // 处理输入是单个对象的情况
          traverseTree(data);
        }
      
        return airConditioners;
      }      
    
    let result = extractAirConditioners(ans)
    
    return result
}

// console.log(Test()); 
export default Test