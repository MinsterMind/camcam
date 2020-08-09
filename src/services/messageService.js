

const sendMessage = async function(app, botToken, userId, message) {
    await app.client.chat.postMessage({
        token: botToken,
        channel: userId,
        text: message
    })
};

module.exports ={
    sendMessage
}