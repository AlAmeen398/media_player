import {serverUrl} from './serverUrl'
import { commonApi } from './commonApi'

// Api call for upload video
export const uploadVideo = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/videos`,reqBody)
}

// get all videos api call

export const getAllVideos = async()=>{
    return await commonApi('GET',`${serverUrl}/videos`,"")
}


// delete video
export const deleteVideo = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/videos/${id}`,"")

}

// add to history
export const addToHistory = async(data)=>{
    return await commonApi('POST', `${serverUrl}/history`, data)
}

// get   history
export const getHistory = async()=>{
    return await commonApi('GET',`${serverUrl}/history`,"")
}

// delete history
export const deletewatchHistory = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/history/${id}`,"")
}
// add category
export const addCategory = async(data)=>{
    return await commonApi('POST', `${serverUrl}/categories`,data)
}

// get all category
export const getAllCategories = async()=>{
    return await commonApi('GET',`${serverUrl}/categories`,"")
}

// delete category
export const deletVideoCategory= async(data)=>{
    return await commonApi('GET',`${serverUrl}/categories/${data}`,{})
} 

// get video details by id
export const getDeleteVideosById = async(id)=>{
    return await commonApi('GET',`${serverUrl}/videos/${id}`,'')
}

// update category
export const updateCategory = async(id,data)=>{
return await commonApi('PUT',`${serverUrl}/categories/${id}`,data)
}