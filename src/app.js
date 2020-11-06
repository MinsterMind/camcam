const { App } = require('@slack/bolt');
const messageService = require('./services/messageService')
const todoList = require('./services/todoList')
const symbl = require('./services/symbl')
const _ = require('lodash')
const fs = require('fs')
const btoa = require('btoa')

const credentials = {
    signingSecret: process.env.SLACK_SIGNING_SECRET || 'da96901e4dd2135fab13d62618476af4',
    token: process.env.SLACK_BOT_TOKEN || 'xoxb-287357138481-1274840734455-iNzqGx3DWXvCx6CJwS9MofKB'
}

const botToken = 'xoxb-287357138481-1274840734455-iNzqGx3DWXvCx6CJwS9MofKB';

const app = new App(credentials);

const channelConversationIdMap = {

};

let channelSubscription = {

};

if(fs.existsSync('subscription.json')) {
    channelSubscription = JSON.parse(fs.readFileSync('subscription.json'))
}

const conversationIdDetails = {};

/* Add functionality here */

(async () => {
    // Start the app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})().then(()=>{
    console.log("success")
}).catch((e)=> {
    console.log('exception ' + e)
});


app.event("app_home_opened", async ({ payload, context }) => {
    const userId = payload.user;
    console.log(userId)
    try {
        await app.client.views.publish({
            // The token you used to initialize your app is stored in the `context` object
            token: context.botToken,
            user_id: userId,
            view: {
                // Home tabs must be enabled in your app configuration page under "App Home"
                "type": "home",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
                        }
                    },
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "AI-Powered Conversational Experience"
                        }

                    },
                    {
                        "type": "image",
                        "title": {
                            "type": "plain_text",
                            "text": "Symbl",
                            "emoji": true
                        },
                        "image_url": "https://symbltestdata.s3.us-east-2.amazonaws.com/rammer.png",
                        "alt_text": "Symbl"
                    },

                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "\n\n :arrow_down: *Select Catalogue which suits your communication style*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*<fakeLink.toYourApp.com|Use Case Catalogue>*\nUse Case Catalogue for the following departments/roles..."
                        },
                        "accessory": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Select"
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Customer support"
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Sales and Marketing"
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Tech discussions"
                                    },
                                    "value": "value-2"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Default"
                                    },
                                    "value": "value-3"
                                }
                            ]
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*<fakeLink.toYourApp.com|Insights sharing Catalogue>*\nChose the way you want to receive Insights from CamCam\n\n"
                        },
                        "accessory": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Select"
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Daily"
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Hourly"
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "emoji": true,
                                        "text": "Custom"
                                    },
                                    "value": "value-2"
                                }
                            ]
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "\n\n :speech_balloon: *Select slack channel to invite symbl*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "\n\n➕ To start tracking your team's insights, *add me to a channel* and I'll introduce myself. I'm usually added to a team or project channel. Type `/invite @Symbl` from the channel or pick a channel on the right.\n\n"
                        },
                        "accessory": {
                            "type": "conversations_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a channel...",
                                "emoji": true
                            }
                        }
                    },
                    {
                        "type": "divider"
                    }
                ]
            }
        });

    }
    catch (error) {
        console.error(error);
    }
});

app.event("message.mpim", async({payload, context})=>{
    console.log(payload);
})

app.event("message.im", async({payload, context})=>{
    console.log(payload);
})

app.event("message.channels", async({payload, context})=>{
    console.log(payload);
})

app.event("message.groups", async({payload, context})=>{
    console.log(payload);
})

app.message(async({message, say}) =>{
    const data = await app.client.users.profile.get({
        token: credentials.token,
        user: message.user})
    console.log(data)
    if(data.profile.real_name.toLowerCase() === "camcam") return;
    const textData = [{
        text: message.text,
        user: {
            userId: `${data.profile.email}|${message.channel}|${message.user}|${message.ts}`,
            name: data.profile.real_name
        }
    }]
    let conversationId = channelConversationIdMap[message.channel] && channelConversationIdMap[message.channel].conversationId;
    let isNew = true;
    if(conversationId) isNew = false;
    else return;
    conversationId = await symbl.processText(textData, conversationId);
    channelConversationIdMap[message.channel] = {conversationId, isUpdated: true};
    if(isNew) {
        await say(`Conversation started, conversationId: ${conversationId}`);
    } else {
        await say(`Appending to conversationId: ${conversationId}`);
    }
})

app.action("topic_button", async(slackApp) => {
    const topic = slackApp.payload.text.text
    const data = await app.client.search.messages({

    })
    await slackApp.ack()
})

app.action("add-todo", async (slackApp)=>{
    console.log("todo button pressed")
    const text = slackApp.payload.value
    const task = {
        details: text
    }

    await todoList.addToTODO(slackApp.body.user.id, task);
    const userId = slackApp.body.user_id

    // const options = {
    //     token: botToken,
    //     channel: userId,
    //     text: "Added to TODO",
    // }
    // await slackApp.respond(options)

    const message = slackApp.body.message
    _.remove(message.attachments, (obj)=>{
        const ind = _.findIndex(obj.blocks, (block)=>{
            return block.block_id === slackApp.action.block_id
        })
        return ind != -1    })
    message.token = botToken
    await slackApp.respond(message)

    // setTimeout(() => {
    //     slackApp.client.chat.delete({
    //         token: slackApp.context.botToken,
    //         channel: slackApp.body.container.channel_id,
    //         ts: slackApp.body.container.message_ts
    //     }).then(()=>{})
    // }, 1000);
    await slackApp.ack();
})

app.command("/camcam-tasks", async (slackApp)=> {
    await slackApp.ack()
    const userId = slackApp.body.user_id
    const options = await getTodoMessages(userId, await todoList.getTODO(userId))
    options.response_type = 'ephemeral';
    await slackApp.respond(await getTodoMessages(userId, await todoList.getTODO(userId)))

})


app.command("/camcam-subscribe", async (slackApp)=> {
    await slackApp.ack()
    const userId = slackApp.payload.user_id
    const channelId = slackApp.payload.channel_id
    if(!channelSubscription[channelId]) channelSubscription[channelId] = [];
    channelSubscription[channelId].push(userId)
    channelSubscription[channelId] = _.uniq(channelSubscription[channelId]);
    console.log('got subscribe event')
    const options = {
        token: botToken,
        channel: channelId,
        text: "Successfully subscribed",
    }
    await slackApp.respond(options)
    fs.writeFileSync('subscription.json', JSON.stringify(channelSubscription))
})

app.command("/camcam-start", async (slackApp)=> {
    await slackApp.ack()
    const channelId = slackApp.payload.channel_id

    const textData = [{
        text: "Starting CamCam",
        user: {
            name: "CamCam",
            userId: "mr.manoj.mali@gmail.com"
        }
    }]
    if(!channelConversationIdMap[channelId]) channelConversationIdMap[channelId]={}
    channelConversationIdMap[channelId].conversationId = await symbl.processText(textData);
    console.log('got start event')
    const options = {
        token: botToken,
        channel: channelId,
        text: `Conversation started, Id: ${channelConversationIdMap[channelId].conversationId}`,
    }
    await slackApp.respond(options)
})

app.command("/camcam-stop", async (slackApp)=> {
    await slackApp.ack()
    const channelId = slackApp.payload.channel_id
    let conversationId;
    await sendInsights(channelId)
    if(channelConversationIdMap[channelId]) {
        conversationId = channelConversationIdMap[channelId].conversationId
        delete channelConversationIdMap[channelId];
    }
    console.log('got stop event')
    const options = {
        token: botToken,
        channel: channelId,
        text: `Conversation stopped, Id: ${conversationId}\n\n${getMeetingLink(conversationId)}`,
    }
    await slackApp.respond(options)
})

app.action("schedule", async (slackApp)=>{
    await slackApp.ack();
})

app.event("view_submission", async (slackApp) => {
    await slackApp.ack();
})
app.view("reply_modal", async (slackApp)=>{
    await slackApp.ack();
    const text = slackApp.view.state.values['reply_text'].ml_input.value
    let private_metadata = slackApp.view.private_metadata.split('|')
    const options = {
        token: credentials.token,
        channel: private_metadata[1],
        thread_ts: private_metadata[3],

        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `<@${private_metadata[2]}> ${text}`
                }
            }
        ]
    }

    await app.client.chat.postMessage(options)
})

app.action("reply", async (slackApp)=>{
    // const channelId = slackApp.body.channel.id
    const triggerId = slackApp.body.trigger_id
    const private_metadata = slackApp.payload.value.split(':|:|:')[1]
    const options = {
        token: credentials.token,
        trigger_id: triggerId,
        view: {
            "callback_id": "reply_modal",
            "title": {
                "type": "plain_text",
                "text": "Reply to Message"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit"
            },
            private_metadata,
            "blocks": [
                {
                    "type": "input",
                    "block_id": "reply_text",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "ml_input",
                        "multiline": true,
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Type your message here..."
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": ":incoming_envelope:"
                    },
                    "hint": {
                        "type": "plain_text",
                        "text": "."
                    }
                }
            ],
            "type": "modal"
        }
    }
    await app.client.views.open(options)
    await slackApp.ack();
})

app.action("complete_todo", async (slackApp) => {
    console.log("completing");
    const taskId = slackApp.action.value
    const userId = slackApp.body.user.id
    await todoList.markAsCompleted(userId, taskId)
    await slackApp.respond(await getTodoMessages(userId, await todoList.getTODO(userId)))

    // await updateTodo(app, slackApp.body.container.channel_id,slackApp.body.container.message_ts, await todoList.getTODO(userId));
    await ack();
})


app.action("delete", async (slackApp)=>{
    console.log("delete button pressed")
    // await slackApp.client.chat.delete({
    //     token: slackApp.context.botToken,
    //     channel: slackApp.body.container.channel_id,
    //     ts: slackApp.body.container.message_ts
    // })

    const message = slackApp.body.message
    _.remove(message.attachments, (obj)=>{
        const ind = _.findIndex(obj.blocks, (block)=>{
            return block.block_id === slackApp.action.block_id
        })
        return ind != -1
    })
    message.token = botToken
    await slackApp.respond(message)
    await slackApp.ack()
})


function getTodoMessages(userId, todoList) {
    const options = {
        token: botToken,
        channel: userId,
        text: _.isEmpty(todoList)?"Congratulations! You have completed all the tasks": "Your tasks",
        attachments: [],
        as_user: true,
        username: 'manoj mali'
    }


    _.forEach(todoList, (task, index) => {
        let text = `${index + 1}) ${task.details}`
        if (task.status === 'completed') {
            text = `~${text}~`
        } else if (task.status === 'created') {
            text = `*${text}*`
        }
        options.attachments.push({
            // text: `${index + 1}) ${task.details}`,
            color: '#34cfeb',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: text
                    },
                    accessory: {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Mark as completed"
                        },
                        "value": task.id,
                        "action_id": "complete_todo"
                    }
                }
            ]
        })
    })
    return options;
}

const showTodo = async function(app, userId, todoList) {
    const options = getTodoMessages(userId, todoList);

    await app.client.chat.postMessage(options)
}

const updateTodo = async function(app, userId,messageTs, todoList) {
    const options = getTodoMessages(userId, todoList);
    options.ts = messageTs;

    await app.client.chat.update(options)
}

const sendInsights = async function(channel) {
    const {conversationId} = channelConversationIdMap[channel];
    channelConversationIdMap[channel].isUpdated = false;
    const conversation = await symbl.getConversation(conversationId)
    let insights = conversation.insights

    let result = {}
    _.map(insights, (obj) => {
        if(!result[obj.type]) result[obj.type]= [];
        result[obj.type].push(`${obj.text}:|:|:${obj.from && obj.from.userId}:|:|:${obj.assignee && obj.assignee.name || ''}:|:|:${obj.dueBy? '*Due By*: '+obj.dueBy.split('T')[0] : ''}`)

    })

    for(let user of channelSubscription[channel]) {
        for (let insight of Object.keys(result)) {
            const displayDetails = details[insight] || {
                displayName: insight
            }
            const options = {
                token: botToken,
                text: insight,
                attachments: [],
                blocks: [
                    {type: "divider"},
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",

                            "text": `${displayDetails.icon} ${displayDetails.displayName} from channel #camcam-test \n\t  _${displayDetails.note || ''}_`
                        }
                    },
                    {type: "divider"},
                ],
                as_user: true,
                username: 'manoj mali'
            }

            const topicsBlock = {
                color: '#34cfeb',
                blocks: []
            }

            if(insight === 'topic') {
                options.attachments.push(topicsBlock)
            }


            let count = 1;
            for (let insightDetails of result[insight]) {
                const userId = insightDetails.split(':|:|:')[1]
                const assignee = insightDetails.split(':|:|:')[2]
                const messageTs = userId && userId.split('|')[3]
                const channel = userId && userId.split('|')[1]
                let textToDisplay = `${insightDetails.split(':|:|:')[0]}`
                const fromUser = userId && userId.split('|')[2]
                const dueBy = insightDetails.split(':|:|:')[3]



                let permalink
                if(messageTs && channel) {
                    permalink = await app.client.chat.getPermalink({
                        token: credentials.token,
                        channel: channel,
                        message_ts: messageTs
                    })
                    permalink = permalink.permalink
                    textToDisplay = `<${permalink}|${textToDisplay}>`
                }

                if(!_.isEmpty(assignee)){
                    textToDisplay += `\n\n *Assignee:* ${assignee}`
                }
                if(!_.isEmpty(dueBy)) {
                    textToDisplay += `\n\n ${dueBy}`
                }
                if(insight === 'question' && !_.isEmpty(fromUser)) {
                    textToDisplay += `\n\n *From*: <@${fromUser}>`
                }
                const insightBlock = {
                    color: '#34cfeb',
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: textToDisplay
                            }
                        }
                    ]
                }

                const actionBlock = {
                    type: 'actions',
                    elements: []
                }
                insightBlock.blocks.push(actionBlock)
                // insightBlock.blocks.push({
                //     type: 'divider'
                // })

                if (insight === 'action_item') {
                    actionBlock.elements.push({
                        ...buttons.TODO,
                        value: insightDetails.split(':|:|:')[0]
                    });
                    actionBlock.elements.push({
                        ...buttons.Reply,
                        value: insightDetails
                    })

                }
                if (insight === 'follow_up') {
                    actionBlock.elements.push({
                        ...buttons.Schedule,
                        value: insightDetails.split(':|:|:')[0]
                    })
                }
                if (insight === 'question') {
                    actionBlock.elements.push({
                        ...buttons.Reply,
                        value: insightDetails
                    })
                }
                if(insight === 'topic') {
                       topicsBlock.blocks.push({
                           type: 'actions',
                           elements: [{
                               type: "button",
                               text: {
                                   "type": "plain_text",
                                   "text": insightDetails.split(':|:|:')[0],
                                   "emoji": true
                               },
                               action_id: "topic_button"
                           }]
                       })
                } else {
                    actionBlock.elements.push({
                        ...buttons.Ignore,
                        value: '' + count
                    })
                }
                count++;
                if(insight !== 'topic') {
                    options.attachments.push(insightBlock)
                }


            }
            options.channel = user;
            await app.client.chat.postMessage(options)
        }

    }

}

const buttons = {
    TODO: {
        "type": "button",
        "text": {
        "type": "plain_text",
            "text": "ToDo",
            "emoji": true
    },
        "action_id": "add-todo",
        // "style": "primary"
    },
    Ignore: {
        "type": "button",
        "text": {
        "type": "plain_text",
            "text": "Ignore",
            "emoji": true
    },
        "action_id": "delete"
    },
    Schedule: {
        "type": "button",
        "text": {
        "type": "plain_text",
            "text": "Add to calendar",
            "emoji": true
        },
        "url": "https://calendar.google.com/calendar",
        "action_id": "schedule"
    },
    Respond: {
        "type": "button",
        "text": {
        "type": "plain_text",
            "text": "respond",
            "emoji": true
        },
        "action_id": "respond"
    },
    Reply: {
        "type": "button",
        "text": {
        "type": "plain_text",
            "text": "Reply",
            "emoji": true
        },

        "action_id": "reply"
    }
}

const details = {
    question: {
        displayName: 'Questions',
        icon: ':question:'
    },
    topic: {
        displayName: 'Topics',
        icon: ':memo:',
        note: `(upcoming : clicking on topic should take you to respective message thread)`
    },
    action_item: {
        displayName: 'Action Items',
        icon: ':white_check_mark:'
    },
    follow_up: {
        displayName: 'Follow Ups',
        icon: ':calendar:'
    }
}

const getMeetingLink = function (id) {
    return `https://meetinginsights.symbl.ai/meeting/#/${btoa(`{"sessionId": "${id}"}`)}`
}
// var cron = require('node-cron');
//
// cron.schedule('*/10 * * * * * ', async () => {
//     for(let channel in channelConversationIdMap) {
//         // console.log(channel)
//         // console.log(channelConversationIdMap[channel]);
//         const {conversationId, isUpdated} = channelConversationIdMap[channel];
//         if(!isUpdated) continue;
//         channelConversationIdMap[channel].isUpdated = false;
//         const conversation = await symbl.getConversation(conversationId)
//         let insights = conversation.insights
//
//         let result = {}
//
//         insights = _.map(insights, (obj) => {
//
//             if(!result[obj.type]) result[obj.type]= [];
//             result[obj.type].push(obj.text)
//
//         })
//
//         let textMessage = '';
//         for(let insight of Object.keys(result)) {
//             textMessage += `${insight}:  ${_.join(result[insight], '\n\t')} \n\n`;
//         }
//         await app.client.chat.postMessage({
//             token : credentials.token,
//             channel,
//             text: textMessage
//         })
//     }
//
// });

