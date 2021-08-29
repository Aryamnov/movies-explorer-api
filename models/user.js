const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Передаваемый адрес должен быть почтовым адресом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('user', userSchema);
