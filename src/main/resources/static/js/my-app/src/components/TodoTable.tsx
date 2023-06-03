import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
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
  updateToDone,
  updateToUndone,
} from "../atoms/RegisterDialogContent";
import { todoData } from "./types";

export default function TodoTable() {
  //taskApiSelectorのsetterには、taskCacheAtomに値をセットする関数が定義されている
  const [savedTask, store] = useRecoilState<todoData[]>(taskApiSelector);
  const [cachedTask, setCahedTask] = useRecoilState(taskCacheAtom);
  const updatedToUpperRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToLowerRowRef = useRef<HTMLTableRowElement[]>([]);
  const updatedToUndoneRowRef = useRef<HTMLTableRowElement[]>([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    store(savedTask); // 初回fetchで返った値をselectorに保存する
  }, [savedTask, store]);

  const handlerJumpToUrl = (refs: string) => {
    window.open('URL');
  }

  //doneゾーンに移動させる
  const handleDone = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToDone(todoId);
    await setCahedTask(updatedTask);

    //↓以下、tableRowハイライトのための実装(TODO 共通化する)
    const doneTaskLength = cachedTask?.filter((v) => v.done === 1).length;
    if (doneTaskLength === undefined) return;
    const tableRow = updatedToUndoneRowRef.current[doneTaskLength];
    if (tableRow) {
      tableRow.style.backgroundColor = "gray";
      setTimeout(() => {
        tableRow.style.backgroundColor = "";
      }, 2000);
    }
  };

  //doneゾーンから戻す(LowPriorityへ)
  const handleUndone = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToUndone(todoId);
    await setCahedTask(updatedTask);

    //↓以下、tableRowハイライトのための実装(TODO 共通化する)
    const undoneTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 0
    ).length;
    if (undoneTaskLength === undefined) return;
    const tableRow = updatedToLowerRowRef.current[undoneTaskLength];
    if (tableRow) {
      tableRow.style.backgroundColor = "gray";
      setTimeout(() => {
        tableRow.style.backgroundColor = "";
      }, 2000);
    }
  };

  // 選択したタスクを消去する
  const handleDelete = (todoId: number) => {
    if (cachedTask === null) return;
    setCahedTask(cachedTask?.filter((v) => v.id !== todoId));
    deleteTodo(todoId);
  };

  //TopPriorityゾーンに移動させる
  const handleUpper = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToTillToday(todoId);
    await setCahedTask(updatedTask);

    //↓以下、tableRowハイライトのための実装(TODO 共通化する)
    const upperTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 1
    ).length;
    if (upperTaskLength === undefined) return;
    const tableRow = updatedToUpperRowRef.current[upperTaskLength];
    if (tableRow) {
      tableRow.style.backgroundColor = "gray";
      setTimeout(() => {
        tableRow.style.backgroundColor = "";
      }, 2000);
    }
  };

  //LowPriorityゾーンに移動させる
  const handleLower = async (todoId: number) => {
    const updatedTask: todoData[] = await updateToTillAfterTomorrow(todoId);
    await setCahedTask(updatedTask);

    //↓以下、tableRowハイライトのための実装(TODO 共通化する)
    const lowerTaskLength = cachedTask?.filter(
      (v) => v.done === 0 && v.till_today === 0
    ).length;
    if (lowerTaskLength === undefined) return;
    const tableRow = updatedToLowerRowRef.current[lowerTaskLength];
    if (tableRow) {
      tableRow.style.backgroundColor = "gray";
      setTimeout(() => {
        tableRow.style.backgroundColor = "";
      }, 2000);
    }
  };

  return (
    <>
      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#fff59d"}
          >
            Top Priority
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <TableHead>
              <TableRow>
                <TableCell width="5%"></TableCell>
                <TableCell width="70%" sx={{ color: "white" }}>
                  task
                </TableCell>
                <TableCell width="15%" sx={{ color: "white" }}>
                  Due
                </TableCell>
                <TableCell width="5%"></TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <Table>
              <TableBody>
                {cachedTask
                  ?.filter(
                    (value) => value.done === 0 && value.till_today === 1
                  )
                  .map((task: any, index: number) => (
                    <TableRow
                      key={task.id}
                      ref={(el) => {
                        (updatedToUpperRowRef.current![
                          index
                        ] as HTMLTableRowElement | null) = el;
                      }}
                    >
                      <TableCell width="5%" padding="checkbox" align="center">
                        <IconButton
                          onClick={() => {
                            handleDone(task.id);
                          }}
                          aria-label="done"
                        >
                          <CheckBoxOutlineBlankIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell width="70%" sx={{ color: "white" }}>
                        {task.task}
                      </TableCell>
                      {/* refsボタン */}
                      <TableCell sx={{ color: "white" }}>
                        <Button
                          variant="outlined"
                          background-color="info"
                          color="secondary"
                          style={{ minWidth: "10%" }}
                          onClick={() => window.open(task.refs)}
                        >
                          URL
                        </Button>
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
                          aria-label="lower"
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
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#69f0ae"}
          >
            Low Priority
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <TableHead>
              <TableRow>
                <TableCell width="5%"></TableCell>
                <TableCell width="70%" sx={{ color: "white" }}>
                  task
                </TableCell>
                <TableCell width="15%" sx={{ color: "white" }}>
                  Due
                </TableCell>
                <TableCell width="5%"></TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <Table>
              <TableBody>
                {cachedTask
                  ?.filter(
                    (value) => value.done === 0 && value.till_today === 0
                  )
                  .map((task: any, index: number) => (
                    <TableRow
                      key={task.id}
                      ref={(el) => {
                        (updatedToLowerRowRef.current![
                          index
                        ] as HTMLTableRowElement | null) = el;
                      }}
                    >
                      <TableCell width="5%" padding="checkbox" align="center">
                        <IconButton
                          onClick={() => {
                            handleDone(task.id);
                          }}
                          aria-label="done"
                        >
                          <CheckBoxOutlineBlankIcon />
                        </IconButton>
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
                      <TableCell width="5%" sx={{ color: "white" }}>
                        <IconButton
                          onClick={() => {
                            handleUpper(task.id);
                          }}
                          aria-label="upper"
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
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ outline: "solid", backgroundColor: "#212121" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            color={"#80d8ff"}
          >
            Done
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            <TableHead>
              <TableRow>
                <TableCell width="5%"></TableCell>
                <TableCell width="70%" sx={{ color: "white" }}>
                  task
                </TableCell>
                <TableCell width="15%" sx={{ color: "white" }}>
                  Due
                </TableCell>
                <TableCell width="5%"></TableCell>
                <TableCell width="5%"></TableCell>
              </TableRow>
            </TableHead>
            <Table>
              <TableBody>
                {cachedTask
                  ?.filter((value) => value.done === 1)
                  .map((task: any, index: number) => (
                    <TableRow
                      key={task.id}
                      ref={(el) => {
                        (updatedToUndoneRowRef.current![
                          index
                        ] as HTMLTableRowElement | null) = el;
                      }}
                    >
                      <TableCell width="5%" padding="checkbox" align="center">
                        <IconButton
                          onClick={() => {
                            handleUndone(task.id);
                          }}
                          aria-label="undone"
                        >
                          <CheckBoxIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        width="70%"
                        sx={{
                          color: "white",
                          textDecoration: "line-through",
                        }}
                      >
                        {task.task}
                      </TableCell>
                      <TableCell
                        width="15%"
                        sx={{ color: "white", textDecoration: "line-through" }}
                        align="center"
                      >
                        {dayjs(task.due).format("YYYY-MM-DD").toString()}
                      </TableCell>
                      <TableCell width="10%" align="center">
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
        </AccordionDetails>
      </Accordion>
    </>
  );
}
