
import { commanApi } from "./commanApis";
import base_url from "./server_urls";

export const userregister=async(data)=>{
    return await commanApi("POST",`${base_url}/register`,data,"")

}

export const userlogin=async(data)=>{
    return await commanApi("POST",`${base_url}/login`,data,"")
}

//adproject

export const addproject = async(data,header)=>{
    return await commanApi("POST",`${base_url}/addproject`,data,header)
}

//home projects

export const homeproject=async()=>{
    return await commanApi('GET',`${base_url}/home-project`,"","")
}

//allprojects

export const allproject=async(header,search)=>{
    return await commanApi('GEt',`${base_url}/all-project?search=${search}`,"",header)
}


//user project
export const userproject=async(header)=>{
    return await commanApi('GET',`${base_url}/user-project`,"",header)
}


//project delete

export const deleteproject=async(id,header)=>{
    return await commanApi('DELETE',`${base_url}/delete-project/${id}`,{},header)
}


// project update

export const editproject =async (id,data,header)=>{
    return await commanApi('PUT',`${base_url}/edit-project/${id}`,data,header)
}

///profile update

export const profileUpdate =async (header,data)=>{
    return await commanApi('PUT',`${base_url}/profile-update`,data,header)
}
