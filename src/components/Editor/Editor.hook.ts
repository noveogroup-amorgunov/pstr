import { useRef, useContext } from 'react';
import { StoreContext } from '~/src/store';

export const useEnhance = (postId: PostId) => {
  const store = useContext(StoreContext);

  const post = store.post.findPostById(postId);

  const defaultValue = useRef(post.text);

  const onInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    store.post.updatePost(post, e.currentTarget.innerText);
  };

  const onBack = () => {
    store.app.changeScreen('list', {});
  };

  return {
    onInput,
    onBack,
    defaultValue,
  }
};
