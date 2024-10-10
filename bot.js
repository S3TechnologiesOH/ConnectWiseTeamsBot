const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // On message received, echo back the same message
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
            try {
                await context.sendActivity(MessageFactory.text(`User message received: ${userMessage}`));

                const replyText = `Echo: ${userMessage}`;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
            } catch (error) {
                await context.sendActivity(MessageFactory.text(`The bot encountered an error or bug: ${error.message}`));
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        // Welcome new members
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            await context.sendActivity(MessageFactory.text(`New members added: ${JSON.stringify(membersAdded)}`));
            const welcomeText = 'Hello and welcome to S3 Connectwise Teams Bot!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;