import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event, context) => {
  try {
    const {token, chat_id} = JSON.parse(event.body);

      const response = await axios.post(
        `https://api.telegram.org/bot${token}/getMe`,
        {}
      );
    return {
      statusCode: 200,
      body: JSON.stringify({success: true, response: response.data}),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    }
  }
};

export { handler };
