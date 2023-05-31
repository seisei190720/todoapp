import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Theme, createStyles, makeStyles, styled } from '@mui/material/styles';
import TodoTable from './TodoTable';
import { Fab } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tasksState } from '../atoms/Tasks';
import { taskApiSelector, todoData } from '../atoms/RegisterDialogContent';

// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//       '&:hover': {
//         backgroundColor: '#6666ff'
//       }
//     }
//   })
// );

// const useStyles = styled('button')(({ theme }) => ({
//     createStyles({
//     '&:hover': {
//         backgroundColor: '#6666ff'
//     }
// })
// }))

export default function TodoList() {
  // const classes = useStyles();

  const [savedTask] = useRecoilState<todoData[]>(taskApiSelector);


  return (
    <>
      <Box padding="2rem" textAlign="center">
        {savedTask.length !== 0 ? (
          <>
            <TodoTable />
          </>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              まだ登録されたタスクはありません。
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}