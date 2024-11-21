import { Form, Input, Select, Button, Layout, Typography, Space } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, ShopOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function Component() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex' }}>
        {/* Left side with logo */}
        <div style={{ flex: 1,  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="public/assets/side_image.png" alt="Vinciniti Logo" style={{ maxWidth: '80%' }} />
        </div>

        {/* Right side with form */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <Title level={2}>Sign Up for Vinciniti</Title>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
          >
            <Form.Item
              name="businessName"
              label="Business Name"
              rules={[{ required: true, message: 'Please input your business name!' }]}
            >
              <Input prefix={<ShopOutlined />} />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select placeholder="Select a category">
                <Option value="restaurant">Restaurant</Option>
                <Option value="retail">Retail</Option>
                <Option value="service">Service</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <Input prefix={<EnvironmentOutlined />} />
            </Form.Item>

            <Space style={{ display: 'flex' }}>
              <Form.Item
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <Input placeholder="City" />
              </Form.Item>

              <Form.Item
                name="postalCode"
                rules={[{ required: true, message: 'Please input your postal code!' }]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Space>

            <Form.Item name="aptSuite" label="Apt/Suite (Optional)">
              <Input />
            </Form.Item>

            <Space style={{ display: 'flex' }}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </Space>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#FE6F61', borderColor: '#FE6F61' }}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}