const mongoose = require('mongoose');

const hostedListzoneidSchema = new mongoose.Schema({
  hostedListzoneid: {
    type: String,
    required: true,
    unique: true 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

const HostedListZoneId = mongoose.model('HostedListZoneId', hostedListzoneidSchema);

module.exports = HostedListZoneId;
