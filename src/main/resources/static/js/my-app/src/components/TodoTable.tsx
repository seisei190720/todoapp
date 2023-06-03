import { useEffect, useState } from "react";
import { tasksState } from "../atoms/Tasks";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import {
  taskApiSelector,
  taskCacheAtom,
  deleteTodo,
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

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                  checked={tasks.length > 0 && tasks.length === selected.length}
                  onChange={handleSelectAll}
                /> */}
              </TableCell>
              <TableCell sx={{ color: "white" }}>Tasks</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Due
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cachedTask?.map((task: any, index: number) => (
              <TableRow key={task.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selected.indexOf(index) !== -1}
                    // onChange={(e: any) => handleCheck(e, index)}
                  />
                </TableCell>
                <TableCell sx={{ color: "white" }}>{task.task}</TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  {dayjs(task.due).format("YYYY-MM-DD").toString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {handleDelete(task.id)}}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
