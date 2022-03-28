import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event, context) => {

  console.log(event.queryStringParameters);
  console.log(event.body);

  // const response = await axios.post(
  //   `https://api.telegram.org/bot${TOKEN}/getMe`,
  //   {}
  // );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
      body: event.body,
      query: event.queryStringParameters,
      // testEnvVar: response.data,
    }),
  };
};

export { handler };
