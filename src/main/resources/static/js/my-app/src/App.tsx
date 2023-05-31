import "./App.css";
// import './styles.css';
import React, { Suspense } from "react";
// import TodoAppBar from "./components/TodoAppBar";
import { DialogContent, createTheme } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import TodoList from "./components/TodoList";
import { RecoilRoot } from "recoil";
import TodoAppBar from "./components/TodoAppBar";

// // ajax関数
// const ajax = (url: string, method = "GET", data: object | null, success: ((req: XMLHttpRequest) => void) | undefined | null = null, error: ((req: XMLHttpRequest) => void) | undefined | null = null, sync = true): void => {
//   let xhr = new XMLHttpRequest();
//   let json = "";
//   // 非同期の状態の更新イベント
//   xhr.onreadystatechange = (e) => {
//     let req = e.target as XMLHttpRequest;
//     if (req == null) {
//       return;
//     }
//     // 非同期処理が完了すれば(Code state - 4)
//     if (req.readyState === XMLHttpRequest.DONE) {
//       if (req.status === 200) {
//         if (success !== null && success !== undefined) {
//           success.call(this, req);
//         }
//       } else {
//         if (error !== null && error !== undefined) {
//           error.call(this, req);
//         }
//       }
//     }
//   }
//   if (data != null) {
//     json = JSON.stringify(data);
//   }

//   // XMLHttpRequest基本設定/
//   xhr.open(method, url, sync);
//   // XMLHttpRequestヘッダー設定
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.setRequestHeader('Cache-Control', 'no-cache');
//   // 非同期通信開始
//   xhr.send(json);
// };

// function App() {
//   const [message, setMessage] = useState("");
//   const [undoneList, setUndoneList] = useState("");
//   const TextButton = styled(Button)`
//   text-transform: none;
// `;
//   useEffect(() => {
//     ajax("/data/hello.json", "GET", null, (msg) => {
//       setMessage(msg.responseText);
//     }, null, false);
//     ajax("/data/undone-list", "GET", null, (msg) => {
//       setUndoneList(msg.responseText);
//     }, null, false);
//   }, []);

//   return (
//     <>
//       {message}
//       {undoneList}
//       <TextButton>text</TextButton>
//       <Button variant="contained">contained</Button>
//       <Button variant="outlined">outlined</Button>
//     </>
//   );
// }
// export default App;

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[300],
    },
    text: {
      primary: grey[800],
      secondary: pink[300],
    },
    background: {
      paper: pink[300],
    },
  },

  // components: {
  //   MuiIconButton: {
  //     styleOverrides: {
  //       sizeMedium:
  //         pink[300]

  //     }
  //   },
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       root:
  //         pink[300]

  //     }
  //   },
  //   MuiInputLabel: {
  //     styleOverrides: {
  //       root:
  //       pink[300]
  //     }
  //   }
  // }
});

export default function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogContent className="App">
          <TodoAppBar />
          <TodoList />
        </DialogContent>
      </Suspense>
    </RecoilRoot>
  );
}
