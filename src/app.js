const { App } = require('@slack/bolt');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET ,
    token: process.env.SLACK_BOT_TOKEN ,
});

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


// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
app.event("app_home_opened", async ({ payload, context }) => {
    const userId = payload.user;
    console.log(userId)
    try {
        // Call the views.publish method using the built-in WebClient
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
                            "text": "Hey there 👋 I'm Symbl.AI Bot. I'm here to help you identify action items, follow-ups, topics in Slack.\n"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*1️⃣ Look by insight type `/symbl` command*. Type `/symbl list <action-items|follow-ups|topics>` to retrieve insights for that day"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*2️⃣ Look by Date  `/symbl` command*. Type `/symbl <date in mm/dd/yy format>` "
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*3️⃣ Look by Assignee  `/symbl` command*. Type `/symbl assignee <assignee_name>` "
                        }
                    },
                    {
                        "type": "image",
                        "title": {
                            "type": "plain_text",
                            "text": "image1",
                            "emoji": true
                        },
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/onboardingComplex.jpg",
                        "alt_text": "image1"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "➕ To start tracking your team's insights, *add me to a channel* and I'll introduce myself. I'm usually added to a team or project channel. Type `/invite @Symbl` from the channel or pick a channel on the right."
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
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "mrkdwn",
                                "text": "👀 View all options with `/symbl list options`\n❓Get help at any time with `/symbl help` or type *help* in a DM with me"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": ":mag: Search results for *Cata*"
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
                            "text": "*<fakeLink.toYourApp.com|Insights sharing Catalogue>*\nChose the way you want to receive Insights from CamCam"
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
                        "type": "divider"
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Next 5 Results"
                                },
                                "value": "click_me_123"
                            }
                        ]
                    }
                ]
            }



        });

         const results = await app.client.users.list({
             token: context.botToken,
             scope: 'channels:read'
         })

        await app.client

         console.log(results);
    }
    catch (error) {
        console.error(error);
    }
});