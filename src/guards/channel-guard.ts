import { ArgsOf, GuardFunction } from "discordx";
import { CommandInteraction } from "discord.js";

export function Channel(channelId: string) {
  const guard: GuardFunction<ArgsOf<"messageCreate"> | CommandInteraction> = async (arg, client, next) => {
    const argObj = arg instanceof Array ? arg[0] : arg;
    if (argObj instanceof CommandInteraction) {
      await next();
    } else {
      const message = argObj;
      if(message.channelId === channelId) {
        console.log(message);
        await next();
      }
    }
  };

  return guard;
}