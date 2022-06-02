import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";
import axios from "axios";
import * as jsdom from "jsdom";

@Discord()
export class Example {
  @On("messageCreate")
  private async onMessage(
    [message]: ArgsOf<"messageCreate">
  ) {
    if (message.channelId === process.env.CHANNEL_ID) {

      let imdbLink = message.content;

      if (message.content.startsWith('https://letterboxd.com/')) {
        const response = await axios.get(message.content, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
          }
        });

        const dom = new jsdom.JSDOM(response.data);
        const element = dom.window.document.querySelector("[data-track-action='IMDb']");

        if (element) {
          const href = element.getAttribute('href')

          if (!href){
            return
          }

          imdbLink = href;
        }
      }

      // check if has imdbId
      const regex = new RegExp("^(?:http:\\/\\/|https:\\/\\/)?(?:www\\.)?(?:imdb.com\\/title\\/)?(tt[0-9]*)");
      const imdbId = regex.exec(imdbLink)?.[1];

      if(!message.member?.id){
        return;
      }

      // create movie suggestion
      if(imdbId){
        await axios.post(process.env.API_URL + '/suggestions', {imdbId}, {headers: {'discord-id': message.member?.id}}).catch(console.error);
      }
    }
  }
}
