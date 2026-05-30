import { create } from "zustand";

type State = {
  counter: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
  random: (qty: number) => void;
  reset: () => void;
};

export const useCountStore = create<State & Actions>((set) => ({
  counter: 0,

  increment: (qty) => set((state) => ({ counter: state.counter + qty })),
  decrement: (qty) => set((state) => ({ counter: state.counter - qty })),
  random: (qty) => set(() => ({ counter: qty })),
  reset: () => set(() => ({ counter: 0 })),
}));
