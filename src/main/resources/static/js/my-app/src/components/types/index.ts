export type todoData = {
    id: number;
    task: string;
    due: Date;
    done: number;
    //仮置きのnull
    priority: number | null;
    refs: string | null;
    till_today: number;
    done_date: Date | null;
  };