import {apiRequestAxio} from "./Axios"; 
export async function getGroups(){
    try{
        const res = await apiRequestAxio("GET","/private-groups") 
        return res.data
    }
    catch(err){
        return []
    }
} 
export async function getGroupDetail(id){
    try{
        const res = await apiRequestAxio("GET","/private-groups/"+id) 
        return res.data
    }
    catch(err){
        return []
    }
} 
export async function getSessionsByUnderGroupId(id){
    try{
        const res = await apiRequestAxio("GET","/sport-groups/"+id) 
        return res.data
    }
    catch(err){
        return []
    }
}

export async function addSession(data){
    console.log(data)
    try{
        const res = await apiRequestAxio("POST","/sessions",data) 
        return res.data
    }
    catch(err){
        return []
    }
} 

export async function joinGroup(userId, currentGroup){ 
    try{
        let members = currentGroup?.members
        members.push(userId)
        const res = await apiRequestAxio("PUT",`/private-groups/${currentGroup?.id}`,{members}) 
        return res.data
    }
    catch(err){
        return []
    }
} 

export async function saveRequest(data){
    try{ 
        const res = await apiRequestAxio("POST",`/private-group-requests`,data) 
        return res.data
    }
    catch(err){
        return []
    }
}
