export interface TimerInputDTO {
  project: string;
  title: string;
}

export interface TimerState extends TimerInputDTO {
  elapsed: number;
  isRunning: boolean;
  id: string;
}

type NewTimerFunc = (timer: TimerInputDTO, inc: number) => TimerState;

export const genRandomId = (inc: number, by = 1): string => {
  const id = inc + by;
  return String(id);
};

export const newTimer: NewTimerFunc = (timer, inc: number) => {
  return {
    ...timer,
    id: genRandomId(inc),
    elapsed: 0,
    isRunning: false,
  };
};
