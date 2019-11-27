import React from 'react';
import { Button, Col, Form, Icon, Input, Layout, Row } from 'antd';
import './css/RegisterPage.css'
import { accountActions } from '../actions'
import { connect } from 'react-redux'
import logo from './420logo.png';

class RegisterForm extends React.Component {

    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                dispatch(accountActions.register(values))
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };


    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const { Content, Header } = Layout;

        return (
            <Layout>
                <Header>
                    <div className="logo"><img src={logo} height={48} alt="420" /></div>
                </Header>
                <Content>
                    <Row type="flex" align="middle">
                        <Col xs={{ offset: 2, span: 20 }} lg={{ span: 6, offset: 8 }}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                                <Form.Item label="Full Name">
                                    {getFieldDecorator('fullname', {
                                        rules: [{ required: true, message: 'Please input your full name!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Full Name"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label="E-mail">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input your email!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label="Phone Nbr.">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Phone"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label="Password" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!'
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(
                                        <Input.Password
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label="Confirm Password" hasFeedback>
                                    {getFieldDecorator('confirm-password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please confirm the entered password!'
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            }
                                        ],
                                    })(
                                        <Input.Password
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Confirm Password"
                                            onBlur={this.handleConfirmBlur}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item  {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" className="register-form-button">
                                        Register
                    </Button>
                                    Or <a href="/login">Login now!</a>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

const registrationForm = Form.create({ name: 'normal_login' })(RegisterForm);

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const RegisterPage = connect(mapStateToProps)(registrationForm);
export default RegisterPage; 