import { autorun } from 'mobx';
import { createContext } from 'react';
import { PostStore } from './post';
import { AppStore } from './app';
import { TelegramStore } from './telegram';

const LOCALSTORAGE_KEY = 'storenext';
export class RootStore {
  public app: AppStore;
  public post: PostStore;
  public telegram: TelegramStore;

  constructor() {
    this.app = new AppStore();
    this.post = new PostStore();
    this.telegram = new TelegramStore();

    const storedJson = localStorage.getItem(LOCALSTORAGE_KEY);

    if (storedJson) {
      this.post.data = JSON.parse(storedJson).posts;
    }

    autorun(() => {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this));
    });
  }

  toJSON() {
    const { post } = this;
    return { posts: post.data };
  }
}

export const store = new RootStore();

export const StoreContext = createContext<RootStore>(store);
export const StoreProvider = StoreContext.Provider;
