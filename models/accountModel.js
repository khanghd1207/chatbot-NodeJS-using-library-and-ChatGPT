const mongoose = require('mongoose')
const accSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    provider: {
        type: String,
        default: 'local'
    },
    history: []
})
const account = mongoose.model('account', accSchema)
module.exports = account