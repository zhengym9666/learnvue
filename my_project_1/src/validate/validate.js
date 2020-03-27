export function validateFloat(aaa,value,callback) {
  const reg = /^[1-9]*[0-9]?(\\.[0-9]*)?$/;
  alert(value)
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的价格，保留两位小数'));
    } else {
      callback();
    }
  }
}
