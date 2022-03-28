import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event, context) => {
  try {
    const { token, chat_id, text, disable_url_preview } = JSON.parse(
      event.body,
    );

    const data: Record<string, any> = {
      chat_id,
      text: text.replace(/{.*=.*}\n\n?/g, ''),
      disable_web_page_preview: Boolean(disable_url_preview),
    };

    const response = await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      data,
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response: response.data }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  }
};

export { handler };
