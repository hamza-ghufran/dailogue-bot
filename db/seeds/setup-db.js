const user = require('../../tables/user')
const user_chat = require('../../tables/user-chats.js')

exports.seed = knex => {
    return (
        knex.schema
            .createTable('user', user)
            .createTable('user_chat', user_chat)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    );
};

exports.down = knex => {
    return (
        knex.schema
            .dropTableIfExists('user')
            .dropTableIfExists('user_chat')
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    );
};