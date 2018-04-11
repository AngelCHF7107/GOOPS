

/*export default function ajax(url = '', data = {}, type = 'GET') {
  //new一个promise对象的实例包装成直接的data数据
  return new Promise(function (resolve, reject) {

    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }

    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}*/

/*

export default function ajax(url='' , data={} , method='GET') {
  if(method === 'GET'){//{name：‘tom’ ， pwd：‘123’}login?name=tom&pwd=123
    let dataString = ''
    Object.keys(data).forEach(key => {
      const value = data[key]
      dataString += key + "=" + value + '&'
    })
    // dataString是否有值
    if(dataString){
      dataString += dataString.substring(0 , dataString.length-1)
    }
    url += '?' + dataString
    return axios.get()
  }else {
    return axios.post(url , data)
  }
}

//上面这种方式要用的话需要得到response然后得到result=response.data
// 还要包装成一个函数里面发异步请求
*/


/*
import axios from 'axios'
//封装一个能传data的promise对象
export default function ajax(url='' , data={} , method='GET') {
  return new Promise(function (resolve , reject) {
    let promise
    if(method === 'GET'){//{name：‘tom’ ， pwd：‘123’}login?name=tom&pwd=123
      let dataString = ''
      Object.keys(data).forEach(key => {
        const value = data[key]
        dataString += key + "=" + value + '&'
      })
      // dataString是否有值
      if(dataString){
        dataString = dataString.substring(0 , dataString.length-1)
        url += '?' + dataString
      }

      promise = axios.get(url)
    }else {
      promise = axios.post(url , data)
    }

    //说明有数据了
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })


}
*/

/*
发送ajax请求的函数封装模块
返回一个promise对象
 */
import axios from 'axios'

export default function ajax(url='', data={}, method='GET') {
  //debugger
  return new Promise(function (resolve, reject) {
    let promise
    if(method==='GET') {// /login?name=tom&pwd=123
      // name=tom&pwd=123
      let dataString = ''
      Object.keys(data).forEach(key => {
        const value = data[key]
        dataString += key + '=' + value + '&'
      })
      if(dataString) {
        dataString = dataString.substring(0, dataString.length-1) // 去掉最后的&
        // /login?name=tom&pwd=123
        url += '?' + dataString
      }


      promise = axios.get(url)
    } else {
      promise = axios.post(url, data) // {name:'tom', pwd: '123'}
    }

    promise.then(response => {
      resolve(response.data) // 调用ajax函数异步获取的数据不再是response, 而是data
    }).catch(error => {
      reject(error)
    })
  })



}

/*
ajax('/login', {name:'tom', pwd: '123'}, 'POST').then(response => {
  const result = response.data
})
*/

// const response = await ajax('/login', {name:'tom', pwd: '123'}, 'POST')
// const result = response.data

// const result = await ajax('/login', {name:'tom', pwd: '123'}, 'POST')








