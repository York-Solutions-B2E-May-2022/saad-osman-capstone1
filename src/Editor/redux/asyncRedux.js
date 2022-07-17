import {ALL_PROCESS, ALL_PROCESS_FOLLOWER, START_PROCESS_FOLLOWER, TOKEN} from "../../Store/actions";
import {useSelector} from "react-redux";

export function addProcess(obj) {
    return async function sideEffect(dispatch) {

        try {
            const response = await fetch("http://localhost:8080/here", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(obj)

            })

            dispatch(getAll())
        } catch (e) {
        }
    }
}

export function getAll() {
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch("http://localhost:8080/all", {
                method: 'GET',
            })
            const data = await response.json();
            dispatch({type: ALL_PROCESS, allProcess: data})
            dispatch({type:ALL_PROCESS_FOLLOWER, allProcessFollower: data })

        } catch (e) {
        }
    }
}
export function deleteWithId(id){
    return async function sideEffect(dispatch){
        try {
            const response = await fetch(`http://localhost:8080/deleteProcess/${id}`, {
                method: 'DELETE',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            dispatch(getAll())


        } catch (e) {
        }
    }
}
export function editTitle(title, id){
    return async function sideEffect(dispatch){
        try {
            const response = await fetch(`http://localhost:8080/editTitle/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body:title
            })
            dispatch(getAll())
        }catch (e){
            console.log(e)
        }
    }
}
export function deleteBackendAction(id, each){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/deleteAction/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(each)
            })
            dispatch(getAll())
        }catch (e){

        }
    }
}
export function addAdditonalAction(id, each){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/addAdditonalAction/${id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(each)
            })
            dispatch(getAll())
        }catch (e){
            console.log(e)
        }
    }
}
export function editStageBE(objId, id, entity){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/editStage/${objId}/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(entity)
            })
            dispatch(getAll())
        }catch (e) {

        }
    }
}

// FOLLOWER

export function submitProcess(obj, id){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/submitProcess/${id}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(obj)
            })
            dispatch(getAll())
        }catch(e){
            console.log(e)
        }
    }
}

export function startProcessToken(id, obj){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/startToken?id=${id}`)
            const data = await response.json()
            console.log(data)
            dispatch({type: TOKEN, token:data })
            dispatch({type: START_PROCESS_FOLLOWER, start: true, select: obj})

        }catch(e){
            console.log(e)
        }
    }
}
export function tokenRemove(token){
    return async function sideEffect(dispatch){
        try{
            const response = await fetch(`http://localhost:8080/removeToken`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json', //defining what we are sending
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(token)
            })
            dispatch({type:TOKEN, token: ''})
        }catch(e){
            console.log(e)
        }
    }
}