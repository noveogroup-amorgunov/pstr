import { useRef, useContext } from 'react';
import { StoreContext } from '~/src/store';
import { useThrottledCallback } from '~/src/helpers/useThrottledCallback';

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

  const onPublish = useThrottledCallback(() => {
    store.telegram.publishPost({
      text: post.text,
    });

    store.post.updatePost(
      post,
      post.text.replace(/{status=.*}/, `{status=published}`)
    );
  }, [post]);

  const onPublishToTest = useThrottledCallback(() => {
    store.telegram.publishPost({
      text: post.text,
      isTesting: true,
    });

    store.post.updatePost(
      post,
      post.text.replace(/{status=.*}/, `{status=published_to_test}`)
    );
  }, [post]);

  return {
    onInput,
    onBack,
    onPublish,
    onPublishToTest,
    defaultValue,
  }
};
