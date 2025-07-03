import axios from "axios";

export const commonApi = async (httpMethod,URL,reqBody)=>{
    let reqConfig = {
        method:httpMethod,
        url: URL,
        data: reqBody,
        Headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err;
    })
}