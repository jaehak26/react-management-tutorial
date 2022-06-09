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

const theme = createTheme();

const MyPaper = styled(Paper)(({theme})=>({
  width: '100%',
  marginTop: theme.spacing(3),
  overflow: "auto"
}))

const MyTable = styled(Table)({
  minWidth: 1080
})

function App(props) {
  const customers = [{
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
  //result에서는 for문을 사용하지 못하므로
  //이렇게 따로 함수를 작성하거나
  //map함수를 result안에 작성하여 해결할 수 있다.
  //
  let rendering = ()=>{
    //배열사용하면 되는 듯
    let result = [];
    let length = customers.length
    for (let i=0; i<length ; i++){
      result.push(
      <Customer
      key={customers[i].id}
      id={customers[i].id}
      image={customers[i].image}
      name={customers[i].name} //props
      birthday={customers[i].birthday}
      gender={customers[i].gender}
      job={customers[i].job}
      />
    )
    }
    return result
  }



  return (
    //<></>는 <Fragment></Fragment>와 같다.
    <MyPaper theme={theme}>
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
        <TableBody>{rendering()}</TableBody>
      </MyTable>
    </MyPaper>
  );
}

export default App;
