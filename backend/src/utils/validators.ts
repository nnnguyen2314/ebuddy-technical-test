import { isEmpty, isEmail } from './common';

export const validateLoginData = (data: any) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors = {errors, ...{email: 'Must not be empty'}};
    }
    if (isEmpty(data.password)) {
        errors = {errors, ...{password: 'Must not be empty'}};
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};
export const validateSignUpData = (data: any) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors = {errors, ...{email: 'Must not be empty'}};
    } else if (!isEmail(data.email)) {
        errors = {errors, ...{email: 'Must be valid email address'}};
    }
    if (isEmpty(data.username)) {
        errors = {errors, ...{username: 'Must not be empty'}};
    }
    if (isEmpty(data.password)) {
        errors = {errors, ...{password: 'Must not be empty'}};
    }
    if (data.password !== data.confirmPassword) {
        errors = {errors, ...{confirmPassword: 'Passwords must be the same'}};
    }

    if (isEmpty(data.firstName)) {
        errors = {errors, ...{firstName: 'Must not be empty'}};
    }
    if (isEmpty(data.lastName)) {
        errors = {errors, ...{lastName: 'Must not be empty'}};
    }
    if (isEmpty(data.phoneNumber)) {
        errors = {errors, ...{phoneNumber: 'Must not be empty'}};
    }
    if (isEmpty(data.country)) {
        errors = {errors, ...{country: 'Must not be empty'}};
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};