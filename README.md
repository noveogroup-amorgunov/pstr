# pstr.

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b1d42da-b5bb-40c5-b2ad-dc825698203d/deploy-status)](https://app.netlify.com/sites/magnificent-bavarois-2def2a/deploys)

Telegram poster app on TypeScript and React. Check it on https://pstr1.netlify.app/.

![](https://github.com/noveogroup-amorgunov/pstr/raw/main/preview.jpg)

## Usage

Go to https://pstr1.netlify.app/. Put token and chats to localStorage in browser console:

```
localStorage.setItem('token', YOUR_TELEGRAM_BOT_TOKEN);
localStorage.setItem('testing_chat', YOUR_TESTING_CHAT);
localStorage.setItem('production_chat', YOUR_PRODUCTION_CHAT);
```

And write posts.

Also you can clone project and deploy environment on your netlify project.

## Dev

You should have a NodeJS with version 16 or higher.

```bash
nvm use
npm install
npm start
```
