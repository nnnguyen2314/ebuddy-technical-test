import React, {useState} from "react";
import {Form, Button, Input, message} from 'antd';

interface LoginFormProps {
    handleLogin: Function
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const { handleLogin } = props;

    const [form] = Form.useForm();
    const email = Form.useWatch('email', form);
    const password = Form.useWatch('password', form);

    const [inputValues, setInputValues] = useState({
        email: '', password: ''
    });

    function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const handleSubmit = () => {
        if (handleLogin) {
            handleLogin({
                email,
                password
            })
        }
    };

    return (
        <Form
            form={form}
            autoComplete="off"
            onFinish={handleSubmit}>
            <Form.Item
                name="email"
                validateTrigger="onBlur"
                rules={[
                    {
                        type: 'email',
                        message: 'Please enter correct email format!',
                    },
                    {
                        required: true,
                        message: 'Email is required!',
                    },
                ]}
            >
                <Input
                    placeholder="Email"
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item
                name="password"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: 'Password is required!',
                    },
                ]}
            >
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login / Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;