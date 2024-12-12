
import { common } from "@mui/material/colors";
import { base_url } from "./baseurl";
import { commonRequest} from "./commonApi";

export const studentRegister=async(body,header)=>{
    return await commonRequest('POST',`${base_url}/reg`,body,header)
}
export const logStudent=async(body)=>{
    return await commonRequest('POST',`${base_url}/login`,body,'')
}

export const verifyMail=async(body)=>{
    return await commonRequest('POST',`${base_url}/forgot`,body,'')
}

export const resetPW =async(id,body)=>{
    return await commonRequest('PUT',`${base_url}/reset/${id}`,body,'')
}
export const updateAdmin=async(id)=>{
    return await commonRequest("GET",`${base_url}/getAdmin/${id}`,'','')
}
export const editAdmin=async(id,body,header)=>{
    return await commonRequest('PUT',`${base_url}/editAdmin/${id}`,body,header)
}
export const addbook=async(body,header)=>{
    return await commonRequest("POST",`${base_url}/addbook`,body,header)
}
export const userlist=async()=>{
    return await commonRequest("GET",`${base_url}/viewusers`,'','')
}
export const booklist=async()=>{
    return await commonRequest("GET",`${base_url}/viewbooks`,'','')
}
export const deletebook=async(id,header)=>{
    return await commonRequest("DELETE",`${base_url}/del/${id}`,{},header)
}
export const editbook=async(id,body,header)=>{
    return await commonRequest("PUT",`${base_url}/viewbooks/${id}`,body,header)
}
export const viewbook=async(search)=>{
    return await commonRequest("GET",`${base_url}/studentviewbooks?search=${search}`,'','')
}

export const reservebook=async(body)=>{
    return await commonRequest("POST",`${base_url}/reserve`,body,"")
}
export const getDetails=async(id)=>{
    return await commonRequest("GET",`${base_url}/getdetails/${id}`,"","")
}
export const decreaseCount=async(id)=>{
    return await commonRequest("GET",`${base_url}/decrease/${id}`,"","")
}
export const getbookHistory=async(id)=>{
    return await commonRequest("GET",`${base_url}/history/${id}`,"","")
}
export const returnB =async(id,body)=>{
    return await commonRequest("PUT",`${base_url}/return/${id}`,body,"")
}
export const reserves=async()=>{
    return await commonRequest("GET",`${base_url}/reserves`,"","")
}
export const approves=async(id)=>{
    return await commonRequest("GET",`${base_url}/approve/${id}`,"","")
}
export const increase=async(id)=>{
    return await commonRequest("GET",`${base_url}/increase/${id}`,"","")
}