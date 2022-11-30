import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {converSecondsToHourAndMinutesString2} from './timeFunctions'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



export default function WorkDataTable(props) {
    let [cumulativeData,setCumulativeData]= React.useState({});
    function createData(taskName, spentTime, spentPercent) {
        return { taskName, spentTime, spentPercent };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      ];

      const getTotalData = ()=>{
        let cumulativeObj = new Object({tasks:{}});
        let totalTime = 0;

        console.log(cumulativeObj);
        console.log(props.datas);
        for (let index = 0; index < props.datas.length; index++) {
            const dailyData = props.datas[index];
            console.log(dailyData);
            for (const [key, val] of Object.entries(dailyData)) {
                if(cumulativeObj.tasks[key]){
                    cumulativeObj.tasks[key].spentTime += val;
                    console.log(1);
                } else {
                    console.log(2);
                    cumulativeObj.tasks[key]= {};
                    cumulativeObj.tasks[key].spentTime = val;
                    cumulativeObj.tasks[key].taskName = key;
                }
                totalTime += val;
            }   
        }
        const keys = Object.keys(cumulativeObj.tasks);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            cumulativeObj.tasks[key].spentPercent = cumulativeObj.tasks[key].spentTime/totalTime;
        }
        cumulativeObj.tasks = Object.values(cumulativeObj.tasks);
        cumulativeObj.totalTime = totalTime;
        cumulativeObj.dailyAverage = totalTime/props.datas.length;

        console.log("cumulativeObj");
        console.log(cumulativeObj);
        return cumulativeObj;
      }

      React.useEffect(()=>{
        // console.log("Get total data");
        // console.log(getTotalData());
        setCumulativeData(getTotalData());
      },[props.datas]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <TableContainer component={Paper} sx={{maxWidth:800, display:'flex',justifyContent:'center', alignItems:'center'}}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Spent Time</TableCell>
            <TableCell align="right">Spent %&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(cumulativeData.tasks) ? cumulativeData.tasks.map((row) => (
            <TableRow
              key={row.taskName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {(row.taskName)?row.taskName:"Undefined"}
              </TableCell>
              {/* <TableCell align="right">{(Math.round(row.spentTime/36))/100} hours</TableCell> */}
              <TableCell align="right">{converSecondsToHourAndMinutesString2(row.spentTime)}</TableCell>
              <TableCell align="right">{Math.round(row.spentPercent * 10000) / 100}%</TableCell>

            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper} sx={{maxWidth:800, display:'flex',justifyContent:'center', alignItems:'center', marginTop:"20px"}}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>General Info</TableCell>
            <TableCell align="right">Spent Time</TableCell>
            {/* <TableCell align="right">Spend %&nbsp;</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow
              key="average"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Total Work in the Interval
              </TableCell>
              {/* <TableCell align="right">{(Math.round(row.spentTime/36))/100} hours</TableCell> */}
              <TableCell align="right">{converSecondsToHourAndMinutesString2(cumulativeData.totalTime)}</TableCell>
        </TableRow>
        <TableRow
              key="average"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Average Daily Work in the Interval
              </TableCell>
              {/* <TableCell align="right">{(Math.round(row.spentTime/36))/100} hours</TableCell> */}
              <TableCell align="right">{converSecondsToHourAndMinutesString2(cumulativeData.dailyAverage)}</TableCell>
        </TableRow>
        

        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}