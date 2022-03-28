import React from 'react';
import { observer } from 'mobx-react-lite';
import { EditorProps } from './Editor.types';
import { useEnhance } from './Editor.hook';

import './styles.css';

export const Editor = observer((props: EditorProps) => {
  const {
    onInput,
    onBack,
    defaultValue,
  } = useEnhance(props.params.id as PostId);

  return (
    <div className="screen__inner editor-screen">
      <div className="editor-screen__controls">
        <a
          className="editor-screen__controls_back"
          href="#"
          onClick={onBack}
        >
          ←
        </a>
        <a href="#">puslish</a>
        <a href="#">puslish to test</a>
      </div>
      <div
        className="draft"
        contentEditable
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      />
    </div>
  );
});
