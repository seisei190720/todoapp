import { useEffect, useState } from "react";
import { tasksState } from "../atoms/Tasks";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import {
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  taskApiSelector,
  taskCacheAtom,
  deleteTodo,
  updateToTillToday,
  updateToTillAfterTomorrow,
} from "../atoms/RegisterDialogContent";
import { todoData } from "./types";

export default function TodoTable() {
  //taskApiSelectorのsetterには、taskCacheAtomに値をセットする関数が定義されている
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask, setCahedTask] = useRecoilState(taskCacheAtom);

  useEffect(() => {
    store(savedTask); // 初回fetchで返った値をselectorに保存する
  }, [savedTask, store]);

  // 選択したタスクを消去する
  const handleDelete = (todoId: number) => {
    if (cachedTask === null) return;
    setCahedTask(cachedTask?.filter((v) => v.id !== todoId));
    deleteTodo(todoId);
  };

  //TopPriorityゾーンに移動させる
  const handleUpper = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToTillToday(todoId);
    setCahedTask(updatedTask);
  };

  //LowPriorityゾーンに移動させる
  const handleLower = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToTillAfterTomorrow(todoId);
    setCahedTask(updatedTask);
  };

  return (
    <>
      <Stack maxWidth={"100%"} justifyContent="center">
        <TableContainer>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={4}
          >
            <Stack>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Typography
                      variant="h6"
                      id="tableTitle"
                      component="div"
                      color={"#fff59d"}
                    >
                      Top Priority
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                </TableRow>
              </TableHead>
              <Table>
                {/* <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                  checked={tasks.length > 0 && tasks.length === selected.length}
                  onChange={handleSelectAll}
                  />
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Tasks</TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                  Due
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    delete
                  </TableCell>
                </TableRow>
              </TableHead> */}
                <TableBody>
                  {cachedTask
                    ?.filter(
                      (value) => value.done === 0 && value.till_today === 1
                    )
                    .map((task: any, index: number) => (
                      <TableRow key={task.id}>
                        <TableCell width="5%" padding="checkbox" align="center">
                          <Checkbox
                          // checked={selected.indexOf(index) !== -1}
                          // onChange={(e: any) => handleCheck(e, index)}
                          />
                        </TableCell>
                        <TableCell width="70%" sx={{ color: "white" }}>
                          {task.task}
                        </TableCell>
                        <TableCell
                          width="15%"
                          sx={{ color: "white" }}
                          align="center"
                        >
                          {dayjs(task.due).format("YYYY-MM-DD").toString()}
                        </TableCell>
                        {/* 優先度調整ボタン */}
                        <TableCell width="5%" align="center">
                          <IconButton
                            onClick={() => {
                              handleLower(task.id);
                            }}
                            aria-label="delete"
                          >
                            <LowPriorityIcon />
                          </IconButton>
                        </TableCell>
                        {/* 削除ボタン */}
                        <TableCell width="5%" align="center">
                          <IconButton
                            onClick={() => {
                              handleDelete(task.id);
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Stack>

            <Stack>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Typography
                      variant="h6"
                      id="tableTitle"
                      component="div"
                      color={"#69f0ae"}
                    >
                      Low Priority
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                </TableRow>
              </TableHead>
              <Table>
                <TableBody>
                  {cachedTask
                    ?.filter(
                      (value) => value.done === 0 && value.till_today === 0
                    )
                    .map((task: any, index: number) => (
                      <TableRow key={task.id}>
                        <TableCell width="5%" padding="checkbox" align="center">
                          <Checkbox 
                          // checked={selected.indexOf(index) !== -1}
                          // onChange={(e: any) => handleCheck(e, index)}
                          />
                        </TableCell>
                        <TableCell width="70%" sx={{ color: "white" }}>
                          {task.task}
                        </TableCell>
                        <TableCell width="15%" sx={{ color: "white" }} align="center">
                          {dayjs(task.due).format("YYYY-MM-DD").toString()}
                        </TableCell>
                        {/* 優先度調整ボタン */}
                        <TableCell width="5%" sx={{ color: "white" }}>
                          <IconButton
                            onClick={() => {
                              handleUpper(task.id);
                            }}
                            aria-label="delete"
                          >
                            <VerticalAlignTopSharpIcon />
                          </IconButton>
                        </TableCell>
                        {/* 削除ボタン */}
                        <TableCell width="5%" align="center">
                          <IconButton
                            onClick={() => {
                              handleDelete(task.id);
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Stack>

            <Stack>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <Typography
                      variant="h6"
                      id="tableTitle"
                      component="div"
                      color={"#80d8ff"}
                    >
                      Done
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                  <TableCell sx={{ color: "white" }} align="center"></TableCell>
                </TableRow>
              </TableHead>
              <Table>
                <TableBody>
                  {cachedTask
                    ?.filter((value) => value.done === 1)
                    .map((task: any, index: number) => (
                      <TableRow key={task.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                          // checked={selected.indexOf(index) !== -1}
                          // onChange={(e: any) => handleCheck(e, index)}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                          {task.task}
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          {dayjs(task.due).format("YYYY-MM-DD").toString()}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              handleDelete(task.id);
                            }}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Stack>
          </Stack>
        </TableContainer>
      </Stack>
    </>
  );
}
