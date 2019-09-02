import isEmpty from './is-empty';
import Validator from 'validator';

const validateLoginInput = (data) => {
  let errors = {};
   data.email = !isEmpty(data.email) ? data.email : '';
   data.password = !isEmpty(data.password) ? data.password : '';

   if(!Validator.isEmail(data.email)) {
       errors.email = 'Email не корректен';
   }

   if(Validator.isEmpty(data.email)) {
       errors.email = 'Введите Email';
   }

   if(!Validator.isLength(data.password, {min: 6, max: 30})) {
       errors.password = 'Пароль должен содержать минимум 6 символов';
   }

   if(Validator.isEmpty(data.password)) {
       errors.password = 'Введите пароль';
   }

   return {
       errors,
       isValid: isEmpty(errors)
   }
};

export default validateLoginInput;
