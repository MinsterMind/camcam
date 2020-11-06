const { App } = require('@slack/bolt');
const credential = {
    signingSecret: process.env.SLACK_SIGNING_SECRET || 'da96901e4dd2135fab13d62618476af4',
    token: process.env.SLACK_BOT_TOKEN || 'xoxb-287357138481-1274840734455-iNzqGx3DWXvCx6CJwS9MofKB'
}
const app = new App(credential);

// G018W83JDND, U0133JW1C23, 1596999318.032000

app.client.chat.postMessage(
    {
        token: credential.token,
        channel: 'U0133JW1C23',
    "blocks": [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Manoj should submit documents tomorrow"
        }
    },

        // {
        //     "type": "button",
        //     "text": {
        //         "type": "plain_text",
        //         "text": "Save"
        //     },
        //     "style": "primary",
        //     "value": "click_me_123",
        //     "action_id": "button"
        // }
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "TODO",
                    "emoji": true
                },
                "action_id": "xxxxxx",
                "style": "primary"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Ignore",
                    "emoji": true
                },
                "action_id": "add-todo"
                // "style": "default"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Add to calendar",
                    "emoji": true
                },
                "url": "https://calendar.google.com/calendar",
                "action_id": "schedule"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "respond",
                    "emoji": true
                },

                "action_id": "respond"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "reply",
                    "emoji": true
                },

                "action_id": "reply"
            }
        ]
    }
]
}
).then((d)=> {
    console.log(d)
}).catch((e)=>{
    console.log(e)
})


app.client.conversations