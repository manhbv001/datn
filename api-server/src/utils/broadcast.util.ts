import axios from 'axios';

function telegram(config: {
  httpToken?: string;
  chatId?: string;
  message: string;
}) {
  const teleUrl = `https://api.telegram.org/bot${
    config.httpToken || process.env.TELE_BOT_HTTP_TOKEN
  }/sendMessage?chat_id=${config.chatId || process.env.TELE_CHAT_ID}&text=${
    config.message
  }`;
  axios.get(teleUrl);
}

export default { telegram };
