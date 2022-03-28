import { useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { StoreContext } from '~/src/store';

export const useEnhance = () => {
  const store = useContext(StoreContext);

  // should be to mobx rerender component
  console.log(store.post.data.length);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    store.post.reorder(
      result.source.index,
      result.destination.index
    );
  };

  const onCreatePost = () => {
    store.post.createPost();
  };

  const onDeletePost = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = e.currentTarget.closest('a');

    e.stopPropagation();
    store.post.deleteById(link?.dataset.id as PostId);
  };

  const onNavigateToPost = (e: React.MouseEvent<HTMLAnchorElement>) => {
    store.app.changeScreen('editor', { id: e.currentTarget.dataset.id })
  }

  return {
    onDragEnd,
    onCreatePost,
    onDeletePost,
    onNavigateToPost,
    postStore: store.post,
  }
};
