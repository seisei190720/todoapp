import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ThemeProvider,
} from "@mui/material/styles";
import TodoTable from "./TodoTable";
import { useRecoilState } from "recoil";
import { taskApiSelector } from "../atoms/RegisterDialogContent";
import { theme } from "../App";
import { todoData } from "./types";

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
            <ThemeProvider theme={theme}>
              <TodoTable />
            </ThemeProvider>
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
