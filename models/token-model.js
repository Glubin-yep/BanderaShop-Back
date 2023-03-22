const {Schema, model} = require('mongoose')

const UserSchema = new Schema({    
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', UserSchema);