import axios from "axios";

 export const commanApi = async (httprequstMethod, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httprequstMethod,
        url,
        data: reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}

    }
    return await axios(reqConfig).then((res)=>{return res}).catch((err)=>{return err} )
}