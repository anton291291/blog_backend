"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("./is-empty"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateRegisterInput = function validateRegisterInput(data) {
  var errors = {};
  data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
  data.email = !(0, _isEmpty["default"])(data.email) ? data.email : '';
  data.password = !(0, _isEmpty["default"])(data.password) ? data.password : '';
  data.password_confirm = !(0, _isEmpty["default"])(data.password_confirm) ? data.password_confirm : '';

  if (!_validator["default"].isLength(data.name, {
    min: 2,
    max: 30
  })) {
    errors.name = 'Имя должно содержать от 2 до 20 символов';
  }

  if (_validator["default"].isEmpty(data.name)) {
    errors.name = 'Поле с именем обязательно для заполнения';
  }

  if (!_validator["default"].isEmail(data.email)) {
    errors.email = 'Email не корректен';
  }

  if (_validator["default"].isEmpty(data.email)) {
    errors.email = 'Поле с Email обязательно для заполнения';
  }

  if (!_validator["default"].isLength(data.password, {
    min: 6,
    max: 30
  })) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  }

  if (_validator["default"].isEmpty(data.password)) {
    errors.password = 'Поле с паролем обязательно для заполнения';
  }

  if (!_validator["default"].isLength(data.password_confirm, {
    min: 6,
    max: 30
  })) {
    errors.password_confirm = 'Пароль должен содержать минимум 6 символов';
  }

  if (!_validator["default"].equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Пароли не совпадают';
  }

  if (_validator["default"].isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Подтвердите пароль';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateRegisterInput;
exports["default"] = _default;