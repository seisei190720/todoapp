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
  todoData,
  taskApiSelector,
  taskCacheAtom,
} from "../atoms/RegisterDialogContent";

export default function TodoTable() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [selected, setSelected] = useState<number[]>([]);

  // すべてのタスクを選択する
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked) {
    //   setSelected([...Array(tasks.length).keys()]);
    //   return;
    // }
    setSelected([]);
  };

  //-テストーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // 値が取得できるまではPromiseをthrowするので次の行が実行されない

  //taskApiSelectorのsetterには、taskCacheAtomに値をセットする関数が定義されている
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask] = useRecoilState(taskCacheAtom);
  useEffect(() => {
    store(savedTask); // 初回fetchで返った値をselectorに保存する
    // console.log("こんにちは");
    // console.log(savedTask);
    // console.log(ezawa);
  }, [savedTask, store]);
  //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  // 特定のタスクを選択する
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const selectedIndex = selected.indexOf(i);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, i);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // 選択したタスクを消去する
  const handleDelete = () => {
    let newTasks = tasks.filter(
      (e: object, i: number) => selected.indexOf(i) === -1
    );
    setTasks(newTasks);
    setSelected([]);
  };

  return (
    <>
      <IconButton
        onClick={handleDelete}
        disabled={selected.length === 0}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={tasks.length > 0 && tasks.length === selected.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell align="center">Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cachedTask?.map((task: any, index: number) => (
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(index) !== -1}
                    onChange={(e: any) => handleCheck(e, index)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell align="center">
                  {dayjs(task.time_limit).format("YYYY-MM-DD").toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
