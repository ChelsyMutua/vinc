import { Form, Button, Layout, Typography } from 'antd';
import Input from './auth-inputs';

const { Content } = Layout;
const { Title } = Typography;

const CustomerSignin = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Sign In to Vinciniti</Title>
            <Form
              form={form}
              name="customer_signup"
              onFinish={onFinish}
              layout="vertical"
              scrollToFirstError
            >

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

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#FE6F61', borderColor: '#FE6F61' }}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default CustomerSignin;