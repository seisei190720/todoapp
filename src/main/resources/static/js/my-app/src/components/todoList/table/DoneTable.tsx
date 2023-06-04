import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { TOP_PRIORITY, todoData } from "../../types";
import React from "react";

type Props = {
  priorityZone: string;
  filteredTask: todoData[] | undefined;
  handleMove: (todoId: number) => Promise<void>;
  handleDone: (todoId: number) => Promise<void>;
  handleDelete: (todoId: number) => void;
  rowRef: React.MutableRefObject<HTMLTableRowElement[]>;
};

const DoneTable: FC<Props> = ({
  priorityZone,
  filteredTask,
  handleMove,
  handleDone,
  handleDelete,
  rowRef,
}) => {

  return (
    <>
      <Table>
        <TableBody>
          {!filteredTask ? (
            <></>
          ) : (
            filteredTask.map((task: any, index: number) => (
              <TableRow
                key={task.id}
                ref={(el) => {
                  (rowRef.current![index] as HTMLTableRowElement | null) = el;
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
                {task.refs === "" ? (
                  <TableCell sx={{ color: "white" }}></TableCell>
                ) : (
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
                )}
                <TableCell width="15%" sx={{ color: "white" }} align="center">
                  {dayjs(task.due).format("YYYY-MM-DD").toString()}
                </TableCell>
                {/* 優先度調整ボタン */}
                <TableCell width="5%" align="center">
                  <IconButton
                    onClick={() => {
                      handleMove(task.id);
                    }}
                    aria-label="lower"
                  >
                    {priorityZone === TOP_PRIORITY ? (
                      <LowPriorityIcon />
                    ) : (
                      <VerticalAlignTopSharpIcon />
                    )}
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
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DoneTable;
