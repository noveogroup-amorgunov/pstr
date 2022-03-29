import { makeAutoObservable } from 'mobx';

export type ScreenName = 'list' | 'editor';

export class AppStore {
  activeScreen: ScreenName = 'list';
  activeScreenParams: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  changeScreen(screen: ScreenName, params: any) {
    this.activeScreen = screen;
    this.activeScreenParams = params;
  }
}
