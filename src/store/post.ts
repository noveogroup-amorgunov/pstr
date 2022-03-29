import { makeAutoObservable } from 'mobx';
import { getFieldFromText, generateNewPost } from '../helpers/utils';

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
