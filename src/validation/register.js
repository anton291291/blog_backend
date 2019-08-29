import isEmpty from './is-empty';
import Validator from 'validator';

const validateRegisterInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
         errors.name = 'Имя должно содержать от 2 до 20 символов';
    }

    if(Validator.isEmpty(data.name)) {
         errors.name = 'Поле с именем обязательно для заполнения';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email не корректен';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Поле с Email обязательно для заполнения';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Поле с паролем обязательно для заполнения';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Пароль должен содержать минимум 6 символов';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Пароли не совпадают';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Подтвердите пароль';
    }

    return {
        errors,
        isValid: isEmpty(errors)
      }
};

export default validateRegisterInput;
