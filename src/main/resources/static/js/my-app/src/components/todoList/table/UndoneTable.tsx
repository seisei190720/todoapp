import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { todoData } from "../../types";
import React from "react";


type Props = {
  filteredTask: todoData[] | undefined;
  handleUndone: (todoId: number) => Promise<void>;
  handleDelete: (todoId: number) => void;
  rowRef: React.MutableRefObject<HTMLTableRowElement[]>;
};

const UndoneTable: FC<Props> = ({
  filteredTask,
  handleUndone,
  handleDelete,
  rowRef,
}) => {
  return (
    <>
      <Table>
        <TableBody>
          {!filteredTask ? (<></>) :
          filteredTask
            .map((task: any, index: number) => (
              <TableRow
                key={task.id}
                ref={(el) => {
                  (rowRef.current![
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
    </>
  );
};

export default UndoneTable;
