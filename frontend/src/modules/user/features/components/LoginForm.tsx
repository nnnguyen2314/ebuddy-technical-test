import React, {useState} from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInputText from '../../../shared/features/formControls/FormInputText';

interface LoginFormProps {
    handleLogin: Function
};

interface IFormInput {
    email: string;
    password: string;
}
const formInputDefaultValues = {
    email: '',
    password: ''
};

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const { handleLogin } = props;
    const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
        defaultValues: formInputDefaultValues,
    });

    const onSubmit = (formData: IFormInput) => {
        console.log(formData);
        if (handleLogin) {
            handleLogin(formData);
        }
    };

    return (
        <Paper
            style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                margin: "10px 300px",
            }}
        >
            <Typography variant="h4">Login</Typography>
            <FormInputText name="email" control={control} label="Email" type="email" rules={{
                required: "You must specify a email"
            }} />
            <FormInputText name="password" control={control} label="Password" type="password" rules={{
                required: "You must specify a password"
            }} />
            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Login
            </Button>
            <Button onClick={() => reset()} variant={"outlined"}>
                Reset
            </Button>
        </Paper>
    );
};

export default LoginForm;