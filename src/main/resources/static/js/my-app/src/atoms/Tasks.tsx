import { atom } from 'recoil';

export const tasksState = atom<{ 
    content: string;
    deadline: any;
}[]>({
        key: 'tasksState',
        default: []
    });