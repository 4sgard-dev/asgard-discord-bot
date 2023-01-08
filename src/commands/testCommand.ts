import { ApplicationCommandOptionType, CommandInteraction, MessageActionRowComponentBuilder, InteractionReplyOptions, ComponentEmojiResolvable } from 'discord.js';
import { ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { ContextMenu } from "discordx"

import { ButtonComponent,ComponentOptions } from "discordx";
interface IGame{
    label:string,
    customID:string,
    emoji:string
}
const games:IGame[] = 
[
    {customID:"csko",label:"CSGO",emoji:'⚡'},
    {customID:"phasma",label:"Phasmophobia",emoji:'👻'},
    {customID:"ow2",label:"OverWatch",emoji:'🐑'},
    {customID:"worms",label:"Wormící",emoji:'🐛'},
    {customID:"skip",label:"Skipuji",emoji:'🐔'}
]
@Discord()
export class buttonHandler {
    // @ButtonComponent({ id: "csko" })
    // @ButtonComponent({ id: "phasma" })
    // @ButtonComponent({ id: "skip" })
    @ButtonComponent({id:RegExp(".")})
    handler(interaction: ButtonInteraction): void {
        let options: InteractionReplyOptions = {
            ephemeral: true,
            content: interaction.customId
        }
        interaction.reply(options)
    }

    @Slash({ description: "gamenight" })
    gamenight(interaction: CommandInteraction): void {
        let buttons:ButtonBuilder[] = [];

        games.forEach(element=>{
            buttons.push(new ButtonBuilder()
            .setLabel(element.label)
            .setStyle(ButtonStyle.Primary)
            .setCustomId(element.customID)
            .setEmoji(element.emoji)
)   
        });

        const buttonRow =
            new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
                buttons
            );

        interaction.reply({
            components: [buttonRow],
        });
    }
}