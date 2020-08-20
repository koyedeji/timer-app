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

export const millisecondsToHuman = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
};

const pad = (numberString: string, size: number) => {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
};

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
