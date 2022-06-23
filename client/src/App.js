import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import { createTheme } from '@mui/system';
import {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

const MyPaper = styled(Paper)(({theme})=>({
  width: '100%',
  marginTop: theme.spacing(3),
  overflow: "auto"
}))

const MyTable = styled(Table)({
  minWidth: 1080
})

const MyProgress = styled(CircularProgress)( ({theme}) => ({
  margin: theme.spacing(2)
}) )

function App(props) {
  const customer = [
    {
      'id': 1,
      //무작위로 사진을 보여주는 사이트라고 함
      'image': 'https://placeimg.com/64/64/1', 
      'name' : '나동빈',
      'birthday': '961222',
      'gender': '남자',
      'job': '대학생'
    },
    {
      'id': 2,
      //무작위로 사진을 보여주는 사이트라고 함
      'image': 'https://placeimg.com/64/64/2', 
      'name' : '홍길동',
      'birthday': '960305',
      'gender': '남자',
      'job': '프로그래머'
    },
    {
      'id': 3,
      //무작위로 사진을 보여주는 사이트라고 함
      'image': 'https://placeimg.com/64/64/3', 
      'name' : '이순신',
      'birthday': '921205',
      'gender': '남자',
      'job': '디자이너'
    }
  ]

  //server의 api를 불러옴


  const [state, setState] = useState({
    customers: [],
    completed: 0
    }); 

    let progress = () => {
      const {completed} = state;
      setState({ completed: completed>=100 ? 0 : completed+1 })
    }
  //componentDidMount
  useEffect(() => {
    let callApi = async () => {
      const response = await fetch('/api/customers');
      const result = await response.json();
      return result;
    }
    callApi().then(result => setState({
      customers: result.customers
    }))
    .catch(error => console.log(error));
  }, [])


  //result에서는 for문을 사용하지 못하므로
  //이렇게 따로 함수를 작성하거나
  //map함수를 result안에 작성하여 해결할 수 있다.
  //
  let rendering = ()=>{
    //배열사용하면 되는 듯
    if(state.customers != [] ){
      let result = [];
      let length = state.customers.length
      for (let i=0; i<length ; i++){
        result.push(
        <Customer
        key={state.customers[i].id}
        id={state.customers[i].id}
        image={state.customers[i].image}
        name={state.customers[i].name} //props
        birthday={state.customers[i].birthday}
        gender={state.customers[i].gender}
        job={state.customers[i].job}
        />
      )
      }
      return result
    }else{
      return (<TableRow>
        <TableCell colSpan={6} align="center">
          <MyProgress theme={theme}></MyProgress>
        </TableCell>
      </TableRow>)
    }

  }



  return (
    //<></>는 <Fragment></Fragment>와 같다.
    //state.customers가 ture일 때만 실행
    <MyPaper theme={theme} variant='determinate' value={state.completed}>
      <MyTable>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rendering() }</TableBody>
      </MyTable>
    </MyPaper>
  );
}

export default App;
