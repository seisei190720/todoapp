import axios from "axios";
import { atom, selector } from "recoil";

export const taskContentState = atom<string>({
  key: "taskContentState",
  default: selector({
    key: 'savedTodoListState',
    get: async ({get}) => {
      try {
        const response = await axios('savedTodoList.json');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  }),
});

export const taskDeadlineState = atom<Date>({
  key: "taskDeadlineState",
  default: new Date(),
});

// export const taskPriorityState = atom<number>({
//   key: "taskPriorityState",
//   default: 1,
// });
