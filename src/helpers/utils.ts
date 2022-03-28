import { nanoid } from 'nanoid';
import { format } from 'date-fns';

export const getFieldFromText = (text: string, fieldName: string) => {
  const [, value] = text.match(new RegExp(`{${fieldName}=(.*)}`, 'i')) || [];
  return value;
};

export const isValidDate = (date: string = '') => {
  return /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(date);
};

export const getFormattedDate = (date: string) => {
  return isValidDate(date) ? date : 'xx/xx';
};

export const formatDate = (
  date: Date = new Date(),
  dateFormat: string = 'dd/MM/yyyy',
) => {
  return format(date, dateFormat);
};

export const generateNewPost = () => {
  const date = formatDate(new Date());
  return {
    id: `id-${nanoid()}`,
    text: `{date=${date}}\n{title=🍔 New post}\n{status=draft}\n\nPost text...`,
  };
};

/*
  const onClick = () => {
    store.post.data.map(lastPost => {
      const title = store.post.getTitle(lastPost);
      const dateFromTitle = title.match(/\d{8}/);
  
      if (dateFromTitle) {
        lastPost.text = lastPost.text.replace(/\d{8}-/, '');
      }
    });
  }
*/
