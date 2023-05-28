import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Theme, createStyles, makeStyles, styled } from '@mui/material/styles';
import TodoTable from './TodoTable';
import { Fab } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { tasksState } from '../atoms/Tasks';

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

  const tasks = useRecoilValue(tasksState);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box padding="2rem" textAlign="center">
        {tasks.length !== 0 ? (
          <>
            <TodoTable />
            <Fab
              // className={classes.fab}
              onClick={handleOpen}
              color="primary"
              aria-label="add"
            >
              {/* <AddIcon /> */}
            </Fab>
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