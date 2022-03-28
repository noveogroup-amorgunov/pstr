import { makeAutoObservable, autorun } from 'mobx';
import { createContext } from 'react';
import { getFieldFromText, generateNewPost } from '../helpers/utils';

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

export class PostStore {
  data: Post[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getTitle(post: Post) {
    return getFieldFromText(post.text, 'title');
  }

  getDate(post: Post) {
    return getFieldFromText(post.text, 'date');
  }

  getStatus(post: Post) {
    const status = getFieldFromText(post.text, 'status');

    if (status === 'published') {
      return `✅ `;
    }

    if (status === 'published_to_test') {
      return `Ⓜ️ `;
    }
  }

  createPost() {
    const post = generateNewPost();
    this.data.unshift(post);
  }

  updatePost(post: Post, nextText: string) {
    const nextPost = this.findPostById(post.id);
    nextPost.text = nextText;
  }

  reorder(startIndex: number, endIndex: number) {
    const result = Array.from(this.data);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    this.data = result;
  }

  deleteById(postId: PostId) {
    this.data = this.data.filter((p) => p.id !== postId);
  }

  findPostById(postId: PostId) {
    return this.data.find((p) => p.id === postId)!;
  }
}

const LOCALSTORAGE_KEY = 'storenext';

export class RootStore {
  public app: AppStore;
  public post: PostStore;

  constructor() {
    this.app = new AppStore();
    this.post = new PostStore();

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
