import React from 'react';
import { Button, Col, Checkbox, Form, Icon, Input, Row, Layout } from 'antd';
import './css/LoginPage.css'
import { accountActions } from '../actions'
import { connect } from 'react-redux'
import logo from './420logo.png';

class LoginForm extends React.Component {
    state = {
        "email": "",
        "password": ""
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                dispatch(accountActions.login(values.email, values.password))
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Content, Header } = Layout;
        return (
            <Layout>
                <Header>
                    <div className="logo"><img src={logo} height={48} alt="420" /></div>
                </Header>
                <Content>
                    <Row type="flex" align="middle">
                        <Col xs={{ offset: 3, span: 18 }} lg={{ span: 6, offset: 8 }}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input your email!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="/forgot-password">
                                        Forgot password
                    </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                    </Button>
                                    Or <a href="/register">register now!</a>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}


const NewLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

const LoginPage = connect(mapStateToProps)(NewLoginForm);
export default LoginPage;