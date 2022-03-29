import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { PostListProps } from './PostList.types';
import { useEnhance } from './PostList.hook';

import './styles.css';

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'var(--writer-bg-color)' : 'transparent',
  width: '100%',
});

export const PostList = observer((props: PostListProps) => {
  const {
    postStore,
    onDragEnd,
    onCreatePost,
    onDeletePost,
    onNavigateToPost,
  } = useEnhance();

  return (
    <div className="postlist screen__inner">
      <div>
        <a href="#" onClick={onCreatePost}>+</a>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {postStore.data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className={`postlist__item ${
                        snapshot.isDragging ? 'postlist__item_draggable' : ''
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <a
                        className="postlist__link"
                        href="#"
                        data-id={item.id}
                        onClick={onNavigateToPost}
                      >
                        <div className="postlist__date">
                          {postStore.getDate(item)}
                        </div>
                        <div className="postlist__title">
                          {postStore.getStatus(item)}
                          {postStore.getTitle(item)}
                        </div>
                        <div
                          className="postlist__delete"
                          onClick={onDeletePost}
                        >
                          X
                        </div>
                      </a>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
