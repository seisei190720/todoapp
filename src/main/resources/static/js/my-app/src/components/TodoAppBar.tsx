import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import { theme } from "../App";
import { useRecoilState } from "recoil";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  taskApiSelector,
  taskCacheAtom,
  todoData,
} from "../atoms/RegisterDialogContent";
import { useState } from "react";

export default function TodoAppBar() {
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask] = useRecoilState(taskCacheAtom);
  // const [tasks, setTasks] = useRecoilState(taskContentState);

  const [taskContent, setTaskContent] = useState<todoData>({
    id: 1,
    title: "",
    done_flg: 0,
    time_limit: new Date(),
  });
  const handlerRegister = () => {
    if (cachedTask === null) return;
    store([
      ...cachedTask,
      taskContent,
    ]);
    // TODO: テキストフィールドを初期化する処理を入れる↓
    
  };

  // const setContent = useSetRecoilState(taskContentState);
  // const [deadline, setDeadline] = useRecoilState(taskDeadlineState);

  //   タスクの内容が変更された時
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskContent((prev) => ({ ...prev, title: e.target.value}));
  };

  //タスクの期限が変更されたとき
  const handleDeadlineChange = (date: any) => {
    // setDeadline(date);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <AppBar position='static' > */}
      {/* <Toolbar> */}
      {/* <Typography variant="h6" color="secondary">
                        <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1}>
                            TO DO
                        </Box>
                    </Typography> */}

      {/* <Container maxWidth={false}> */}
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <TextField
          onChange={handleContentChange}
          label="ToDo"
          variant="filled"
          color="secondary"
          placeholder="type your new todo"
          inputProps={{ style: { color: "white" } }}
          style={{ minWidth: "70%", background: "#323232" }}
          // focused
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // defaultValue={dayjs(new Date())}
            onChange={(date) => handleDeadlineChange(date)}
            label={dayjs(new Date()).toString()}
            slotProps={{
              textField: {
                variant: "filled",
                color: "secondary",
                focused: false,
                label: "date",
                style: { background: "#323232" },
              },
            }}
          />
        </LocalizationProvider>
        <Button
          variant="outlined"
          background-color="info"
          color="secondary"
          style={{ minWidth: "10%" }}
          onClick={handlerRegister}
        >
          register
        </Button>
      </Stack>
      {/* </Container> */}
      {/* </Toolbar> */}
      {/* </AppBar> */}
    </ThemeProvider>
  );
}
