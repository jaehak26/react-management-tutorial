import React, {Fragment} from "react";

//props 활용
function Customer(props) {

    return (
        <Fragment>
            <CustomerProfile
            id={props.id}
            image={props.image}
            name={props.name}
            ></CustomerProfile>
            
            <CustomerInfo
            birthday={props.birthday}
            gender={props.gender}
            job={props.job}
            ></CustomerInfo>
        </Fragment>
        
    )
}

function CustomerProfile(props) {
    return (
        <div>
            <img src={props.image} alt='profile'></img>
            <h2>{props.name} ({props.id})</h2>
        </div>
    )
}

function CustomerInfo(props){
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}

export default Customer