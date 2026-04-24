import { makeAutoObservable } from 'mobx';

export class WsStore {
  isConnected = false;
  lastError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setConnected(value: boolean): void {
    this.isConnected = value;
  }

  setLastError(message: string | null): void {
    this.lastError = message;
  }
}
