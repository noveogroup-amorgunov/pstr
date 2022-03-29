import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '~/src/store';
import { ScreenName } from '~/src/store/app';

import Editor from '../Editor';
import PostList from '../PostList';

import './styles.css';

const screenMap: Record<ScreenName, React.ComponentType<{ params: any }>> = {
  editor: Editor,
  list: PostList,
};

export const Screen = observer(() => {
  const store = useContext(StoreContext);
  const CurrentScreen = screenMap[store.app.activeScreen];

  return (
    <>
      <div className="logo">pstr.</div>
      <div className="screen">
        <div className="screen__notch"></div>
        <CurrentScreen params={store.app.activeScreenParams} />
      </div>
    </>
  );
});
