// para instalar aca debes de instalar npm install yup

import *  as yup from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const logvalidateschema=yup.object().shape({
    email:yup
    .string()
    .matches(emailRegex,'el correo no es valido')
    .required(),
    password:yup
    .string()
    .required('obligatorio')
    .matches(/^(?!\s)(?=.*[a-zA-Z0-9\s]).{4,}(?<!\s)$/,'no debe de tener espacios al principio ni al final, minimo 4 caracteres')
    .max(20)
})
export const createuserValidacion=yup.object().shape({
    email:yup
    .string()
    .matches(emailRegex,'el correo no es valido')
    .required('obligatorio'),
    password:yup
    .string()
    .required('obligatorio')
    .matches(/^(?!\s)(?=.*[a-zA-Z0-9\s]).{4,}(?<!\s)$/,'no debe de tener espacios al principio ni al final, minimo 4 caracteres')
    .max(20)
    ,
    password2:yup
    .string()
    .required('obligatorio')
    .matches(/^(?!\s)(?=.*[a-zA-Z0-9\s]).{4,}(?<!\s)$/,'no debe de tener espacios al principio ni al final, minimo 4 caracteres')
    .max(20)
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    ,nombre:yup
    .string()
    .required('obligatorio')
    .min(3,'el nombre debe de tener al menos 3 cararcteres')
    ,apellidos:yup
    .string()
    .required('obligatorio')
    .min(3,'los apellidos deben de tener al menos 3 cararcteres')
    ,telefono:yup
    .string()
    .required('obligatorio')
    .matches(/^\+?(\d\s?){8,}$/,'numero de telefono no valido')
    ,
    sexo:yup
    .string()
    .required('obligatorio')
    ,pais:yup
    .string()
    .required('obligatorio')
})

