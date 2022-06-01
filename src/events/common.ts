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
// Get imdb link from letterboxd
function getImdbLink(letterboxdUrl: string): any {
  const regex = new RegExp("^(?:http:\\/\\/|https:\\/\\/)?(?:www\\.)?(?:letterboxd.com\\/film\\/)([a-zA-Z0-9]*)");
  const letterboxdId = regex.exec(letterboxdUrl)?.[1];
  if(!letterboxdId){
    return;
  }
  const url = `https://letterboxd.com/api/v2/film/${letterboxdId}/imdb/`;
  return axios.get(url).then(res => res.data.imdb_id).catch(console.error);
}