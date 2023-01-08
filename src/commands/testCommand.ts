import { ApplicationCommandOptionType, CommandInteraction, MessageActionRowComponentBuilder, InteractionReplyOptions, ComponentEmojiResolvable } from 'discord.js';
import { ButtonInteraction, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { ContextMenu } from "discordx"

@Discord()
export class slashPing {
    @Slash({ name: "ping", description: "PING!" })
    async onPing(interaction: CommandInteraction) {
        interaction.reply("PONG!");
    }
}

@Discord()
export class slashPingChoice {
    @Slash({ name: "pingchoice", description: "PING! But with Choice" })

    async onPing(
        @SlashChoice("Human", "Android", "Dev")
        @SlashOption({
            description: "What are you?",
            name: "what",
            required: true,
            type: ApplicationCommandOptionType.String,
        })
        what: string,
        @SlashOption({
            description: "fuel",
            name: "fuel",
            required: true,
            type: ApplicationCommandOptionType.String,
        })
        fuel: number,

        interaction: CommandInteraction
    ) {
        try {
            interaction.reply(`PONG!! Mr.${what}. You are currently having ${fuel} of fuel`)
        }
        catch (error) {
            console.error(error);
        }
    }
}

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

import { ApplicationCommandType, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

@Discord()
export class Example {
    @ContextMenu({
        name: "Hello from discordx",
        type: ApplicationCommandType.Message,
    })
    messageHandler(interaction: MessageContextMenuCommandInteraction): void {
        console.log("I am message");
        interaction.reply("message interaction works");
    }

    @ContextMenu({
        name: "Hello from discordx",
        type: ApplicationCommandType.User,
    })
    userHandler(interaction: UserContextMenuCommandInteraction): void {
        console.log(`Selected user: ${interaction.targetId}`);
        interaction.reply("user interaction works");
    }
}