import axios from 'axios';
import React,{useState} from 'react'


//컴포넌트는 대문자로 시작해야 한다.

function CustomerAdd(props)
{

    const [state, setState] = useState({
        file: null, //byte형태
        userName: "",
        birthday: "",
        gender: "",
        job: "",
        fileName:""
    })

    let addCustomer = ()=>{
        const url = '/api/customers';
        const formData = new FormData()
        formData.append('image', state.file)
        formData.append('name',state.name)
        formData.append('birthday',state.birthday)
        formData.append('gender',state.gender)
        formData.append('job',state.job)
        //input type에 file이 있으면 명시해야 함
        //type="file"은 클라이언트에서 서버로 데이터를 전송하기 위한 input이다
        const config ={
            headers: {
                "content-type" : "multipart/form-data"
            }
        }
        return axios.post(url, formData, config);
    }

    let handleFormSubmit = (event) => {
        event.preventDefault();
        addCustomer()
            .then((response)=>{
                console.log(response.data)
            })
    }

    let handleFileChange = (event) =>{
        setState({
            file: event.target.files[0],
            fileName: event.target.value
        })
    }

    let handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
    }

    return(
        <>
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지:<input type="file" name="file" file={state.file} value={state.fileName} onChange={handleFileChange}></input><br></br>
            이름: <input type="text" name="userName" value={state.userName} onChange={handleValueChange}></input><br></br>
            생년월일: <input type="text" name="birthday" value={state.birthday} onChange={handleValueChange}></input><br></br>
            성별: <input type="text" name="gender" value={state.gender} onChange={handleValueChange}></input><br></br>
            직업: <input type="text" name="job" value={state.job} onChange={handleValueChange}></input><br></br>
            <button type="submit">추가하기</button>
        </form>
        </>
    );

}

export default CustomerAdd