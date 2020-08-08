const { App } = require('@slack/bolt');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET ,
    token: process.env.SLACK_BOT_TOKEN
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

// app.event("app_about_opened", async ({ payload, context }) => {
//     const userId = payload.user;
//     console.log(userId)
//     try {
//         // Call the views.publish method using the built-in WebClient
//         await app.client.views.publish({
//             // The token you used to initialize your app is stored in the `context` object
//             token: context.botToken,
//             user_id: userId,
//             view: {
//                 // Home tabs must be enabled in your app configuration page under "App Home"
//                 "type": "about",
//                 "blocks": [
//                     {
//                         "type": "divider"
//                     }
//                 ]
//             }
//         })
//     }
//     catch (error) {
//         console.error(error);
//     }
// });

// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
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