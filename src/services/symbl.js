const axios = require('axios');
const _ = require('lodash');

const appId = '4b716c5778414e6776327a767332434c51386b6565584b726a4d794430473769';
const appSecret = '556b78427251364f467733454d77704d6a5854312d3973617546765a75676c59646f4a6272475a704867492d4954695675582d776c6338504779385579515938';


const getToken = async function () {
    const result = await axios.post("https://api.symbl.ai/oauth2/token:generate", {
        type: "application",
        appId: appId,
        appSecret: appSecret
    });
    console.log(result.data.accessToken);
    return result.data.accessToken;
}

const processText = async function(textMessage, conversationId) {
    const token = await getToken();

    textMessage = _.map(textMessage, (message)=> {
        return {
            payload: {
                content: message.text
            },
            from: message.user
        }
    })
   const options =  {
        method: 'POST',
        url: 'https://api.symbl.ai/v1/process/text',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': token
        },
        data: JSON.stringify({
            "messages": textMessage,
            "confidenceThreshold": 0.5
        })
    }
    if(conversationId) {
        options.method = 'PUT';
        options.url += `/${conversationId}`
    }

    const result = await axios(options)
    return result.data.conversationId
}

const getConversation = async function(conversationId) {
    const token = await getToken();

    const options =  {
        method: 'GET',
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/insights`,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': token
        }
    }
    const result = await axios(options)
    return result.data
}


module.exports = {
    processText,
    getConversation
}