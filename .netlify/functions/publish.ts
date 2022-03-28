import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {

  console.log(process.env.TELEGRAM_TESTING_TOKEN);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
      testEnvVar: process.env.TELEGRAM_TESTING_TOKEN,
    }),
  };
};

export { handler };
