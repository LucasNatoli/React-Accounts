import React from 'react'
import { Button, Card, Col, Form, Icon, Input, Layout, Row, Skeleton, Switch } from 'antd';
import './css/UserAccount.css'
import { accountActions } from '../actions'
import { connect } from 'react-redux'

const { Meta } = Card;

class UserAccountPage extends React.Component {
  state = {
    fetching: false,
    editing: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch(accountActions.updateAccountInfo(values))
      }
    });
  };

  onFetchingModeChange = checked => {
    this.setState({ fetching: checked });
  };

  onEditModeToggle = checked => {
    this.setState({ editing: checked })
  };

  componentDidMount = () => {

    const { dispatch } = this.props
    dispatch(accountActions.getAccountInfo())
  };

  render() {

    const { fullname, email, phone, fetching } = this.props
    const iconCheck = <Icon type="check" />
    const iconEdit = <Icon type="edit" />

    const { getFieldDecorator } = this.props.form
    const { Content, Header } = Layout;

    const { editing } = this.state;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };

    return (
      <Layout>
        <Header>
          <h1>Account info</h1>
          <div className="user-details">
            <Switch
              checked={editing}
              onChange={this.onEditModeToggle}
              checkedChildren={iconCheck}
              unCheckedChildren={iconEdit}
            />
          </div>
        </Header>
        <Content className="user-account-content">
          <Row type="flex" align="middle">
            <Col xs={{ offset: 1, span: 22 }} lg={{ span: 8, offset: 8 }}>
              <Card title="Account Information" className="user-account-card">
                <Form onSubmit={this.handleSubmit} className="useraccount-form">
                  <Skeleton loading={fetching} active paragraph={{ rows: 8 }}>
                    <Meta description={<div>
                      <Form.Item {...formItemLayout} label="Full Name" className="user-account-form-item">
                        {getFieldDecorator('fullname', {
                          rules: [{ required: true, message: 'Please input your full name!' }],
                          initialValue: fullname
                        })(
                          editing ? <Input
                            placeholder="Your name"
                          /> : <span>{fullname}</span>,
                        )}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Email" className="user-account-form-item">
                        {getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please input your email!' }],
                          initialValue: email
                        })(editing ? <Input placeholder="Contact e-mail" /> : <span>{email}</span>)}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="Phone" className="user-account-form-item">
                        {getFieldDecorator('phone', {
                          rules: [{ required: true, message: 'Please input your phone number!' }],
                          initialValue: phone
                        })(editing ? <Input placeholder="Phone number" /> : <span>{phone}</span>)}
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="useraccount-form-button" disabled={!editing}>
                          Save
                          </Button>
                      </Form.Item>
                    </div>}
                    />
                  </Skeleton>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}


const userAccount = Form.create({ name: 'acountinfo_form' })(UserAccountPage)

function mapStateToProps(state) {
  const { fullname, phone, email, fetching } = state.accountInfo;
  return { fullname, phone, email, fetching };
}

const UserAccount = connect(mapStateToProps)(userAccount);
export default UserAccount; 