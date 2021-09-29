import { localStorageKeys } from "./constant";

export const getLocalStorage = (key) =>{
    try{
    if(key){
        const data = localStorage.getItem(key);
        if(data){
            return JSON.parse(data)
        }
    }
}
    catch(e){
        console.log({e})
    }
    return null
  
}

export const setLocalStorage = (key, data) =>{

    if(key && data){

        localStorage.setItem(key, JSON.stringify(data));
        
    }
}

export const removeLocalStorageKey = (key) =>{
       if(key){
         localStorage.removeItem(key)
       }
}
  
  