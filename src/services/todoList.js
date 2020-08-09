const { v4: uuidv4 } = require('uuid');
const _ = require('lodash')

const userListMap = {}

const addToTODO = async function(userId, task) {
    if(!userListMap[userId]) userListMap[userId] = [];
    task.id = uuidv4();
    task.status = 'created'
    userListMap[userId].push(task);
}

const getTODO = async function (userId) {
    return _.filter(userListMap[userId],(task) =>{
        return task.status === 'created'
    })
}

const markAsCompleted = async function(userId, taskId) {
    for(let task of userListMap[userId]) {
        if(task.id === taskId) {
            task.status = 'completed'
        }
    }
}

module.exports = {
    addToTODO,
    getTODO,
    markAsCompleted
}