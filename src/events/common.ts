import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";
import axios from "axios";

@Discord()
export class Example {
  @On("messageCreate")
  private onMessage(
    [message]: ArgsOf<"messageCreate">
  ) {
    if (message.channelId === process.env.CHANNEL_ID) {

      // check if has imdbId
      const regex = new RegExp("^(?:http:\\/\\/|https:\\/\\/)?(?:www\\.)?(?:imdb.com\\/title\\/)?(tt[0-9]*)");
      const imdbId = regex.exec(message.content)?.[1];

      if(!message.member?.id){
        return;
      }

      // create movie suggestion
      if(imdbId){
        axios.post(process.env.API_URL + '/suggestions', {imdbId}, {headers: {'discord-id': message.member?.id}}).catch(console.error);
      }
    }
  }
}
