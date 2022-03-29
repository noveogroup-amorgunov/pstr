import axios from 'axios';
import { getFieldFromText } from '~/src/helpers/utils';

const LOCALSTORAGE_TELEGRAM_BOT_TOKEN = 'token';
const LOCALSTORAGE_TELEGRAM_TESTING_CHAT = 'testing_chat';
const LOCALSTORAGE_TELEGRAM_PRODUCTION_CHAT = 'production_chat';

/**
 * @see https://core.telegram.org/bots/api#sendmessage
 */
const ENDPOINT = 'https://api.telegram.org/bot{token}/sendMessage';

type PublishPostArg = {
  text: string;
  isTesting?: boolean;
}

export class TelegramStore {
  private telegramTestingChat: string | null;
  private telegramProductionChat: string | null;
  private telegramBotToken: string | null;

  constructor() {
    this.telegramBotToken = localStorage.getItem(LOCALSTORAGE_TELEGRAM_BOT_TOKEN);
    this.telegramTestingChat = localStorage.getItem(LOCALSTORAGE_TELEGRAM_TESTING_CHAT);
    this.telegramProductionChat = localStorage.getItem(LOCALSTORAGE_TELEGRAM_PRODUCTION_CHAT);
  }

  async publishPost({
    text,
    isTesting,
  }: PublishPostArg) {
    if (!this.telegramBotToken) {
      return null;
    }

    // TODO: Migrate to MarkdownV2 parse_mode
    const data: Record<string, any> = {
      chat_id: isTesting ? this.telegramTestingChat : this.telegramProductionChat,
      text: text
        .replace(/{.*=.*}\n\n?/g, ''),
      parse_mode: 'Markdown',
      disable_web_page_preview: Boolean(getFieldFromText(text, 'disable_url_preview')),
    };

    await axios.post(ENDPOINT.replace('{token}', this.telegramBotToken), data);
  }
}
