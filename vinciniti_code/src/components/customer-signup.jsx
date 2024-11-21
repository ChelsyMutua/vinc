import { Form, Button, Layout, Typography, Space } from 'antd';
import Input from './auth-inputs';
import './customer-signup.css'; // Import your CSS file

const { Content } = Layout;
const { Title } = Typography;

const CustomerSignup = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex' }}>
        <div className="container" style={{ flex: 1 }}></div>
        <div className="container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="container" style={{ padding: '2rem' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Sign Up for Vinciniti</Title>
            <Form
              form={form}
              name="customer_signup"
              onFinish={onFinish}
              layout="vertical"
              scrollToFirstError
            >
              <Space style={{ display: 'flex' }} align="baseline">
                <Input 
                  type="text" 
                  placeholder="First Name" 
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                />
                <Input 
                  type="text" 
                  placeholder="Last Name" 
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                />
              </Space>

              <Input 
                type="email" 
                placeholder="Email" 
                name="email"
                rules={[
                  { type: 'email', message: 'The input is not a valid E-mail!' },
                  { required: true, message: 'Please input your E-mail!' }
                ]}
              />

              <Input 
                type="password" 
                placeholder="Password" 
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              />

              <Input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirm"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              />

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#FE6F61', borderColor: '#FE6F61' }}>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CustomerSignup;
