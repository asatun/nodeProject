const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nom: {
        type: 'string',
        required: true,
        unique: true,
    },
    prenom: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    sexe: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: true
    },
    insert_date: {
        type: 'date',
        required: false
    },

})

const usersDb = mongoose.model('users', schema);
module.exports = usersDb;