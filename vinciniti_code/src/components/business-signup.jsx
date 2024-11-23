import { Form, Input, Button, Layout, Typography, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PhoneOutlined, EnvironmentOutlined, ShopOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";


const { Content } = Layout;
const { Title } = Typography;


const API_BASE_URL = 'https://vinc-production-3a9e.up.railway.app'; // Backend base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication if needed
});

// Function to submit business profile
export async function submitBusinessProfile(values) {
  try {
    const { data } = await axiosInstance.post('api/businesses/profile', values);
    return { success: true, message: data.message, business: data.business };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Failed to create business profile. Please try again.';
    return { success: false, message: errorMessage };
  }
}

export default function BusinessSignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const hideLoading = message.loading("Submitting your profile...", 0);
    try {
      const response = await submitBusinessProfile({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm,
        business_name: values.businessName,
        phone_number: values.phoneNumber,
        address: values.address,
        city: values.city,
        postal_code: values.postalCode,
        app_suite: values.aptSuite || '', // Optional field
      });
  
      if (response.success) {
        hideLoading(); // Hide loading spinner
        message.success(response.message);
        navigate('/signup-confirmation'); // Redirect to confirmation page
      } else {
        hideLoading();
        message.error(response.message);
      }
    } catch (error) {
      hideLoading();
      message.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Content style={{ display: "flex" }}>
        {/* Left side with logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="public/assets/side_image.png" alt="Vinciniti Logo" style={{ maxWidth: "80%" }} />
        </div>

        {/* Right side with form */}
        <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          <Title level={2}>Sign Up for Vinciniti</Title>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
          >
            {/* Form fields here */}
            <Form.Item
              name="businessName"
              label="Business Name"
              rules={[{ required: true, message: "Please input your business name!" }]}
            >
              <Input prefix={<ShopOutlined />} />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please input your phone number!" }]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please input your address!" }]}
            >
              <Input prefix={<EnvironmentOutlined />} />
            </Form.Item>

            <Space style={{ display: "flex" }}>
              <Form.Item
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Input placeholder="City" />
              </Form.Item>

              <Form.Item
                name="postalCode"
                rules={[{ required: true, message: "Please input your postal code!" }]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Space>

            <Form.Item name="aptSuite" label="Apt/Suite (Optional)">
              <Input />
            </Form.Item>

            <Space style={{ display: "flex" }}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Please input your first name!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please input your last name!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </Space>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#FE6F61", borderColor: "#FE6F61" }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
