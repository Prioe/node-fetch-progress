import EventEmitter from 'events';
import { Response } from 'node-fetch';

export type Options = {
  throttle?: number;
}

export class Progress extends EventEmitter {
  constructor(response: Response, options?: Options);

  on(value: 'progress', callback: (p: ProgressValue) => void): void;
}

export type ProgressValue = {
  total: number;
  done: number;
  totalh: string;
  doneh: string;
  startedAt: Date;
  elapsed: number;
  rate: number;
  rateh: string;
  estimated: number;
  progress: number;
  eta: number;
  etaDate: Date;
  etah: string;
}
