/**
 * Created by xu82 on 2017/3/20.
 */
import axios from 'axios'

export function fetch(url,oSendData){
  return new Promise((resolve,reject)=>{
    axios.get(url,{
      params:oSendData
    }).then(response =>{
      resolve(response);
    })
  })
}




