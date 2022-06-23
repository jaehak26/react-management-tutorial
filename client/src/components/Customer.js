import React, {Fragment} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



//props 활용
function Customer(props) {

    return (
        <Fragment>
            <TableRow>
                <TableCell>{props.id}</TableCell>
                <TableCell><img src={props.image} alt='profile'></img></TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.birthday}</TableCell>
                <TableCell>{props.gender}</TableCell>
                <TableCell>{props.job}</TableCell>
            </TableRow>
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