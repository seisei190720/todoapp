import axios, { AxiosRequestConfig } from "axios";
import { DefaultValue, atom, selector } from "recoil";


export type todoData = {
  id: number;
  title: string;
  done_flg: number;
  time_limit: Date;
};

export const options: AxiosRequestConfig = {
  url: "http://localhost:3000/data/hello.json",
  method: "GET",
  responseType: "json",
};

//テスト-------------------------------------------
// キャッシュ置き場
export const taskCacheAtom = atom<todoData[] | null>({
  key: "taskCacheAtom",
  default: null,
});

export const taskApiSelector = selector<todoData[]>({
  key: "taskApiSelector",
  get: async ({ get }) => {
    try {
      const response = await axios(options);
      const res: todoData[] = await response.data;
      return res;
    } catch (error) {
      throw error;
    }
  },

  // コンポーネント側で使いやすいようにsetterも定義
  // コンポーネント側で直接myApiValueAtomを更新しても同じです。
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      //キャッシュクリア用のお約束
      return newValue;
    } else {
      //atomにキャッシュとして保存する
      //第1引数(Atom)に、第2引数(todo[])を追加する
      set(taskCacheAtom, newValue);
    }
  },
});
//-----------------------------------------------

