import { Form, Input, Button, Layout, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PhoneOutlined, EnvironmentOutlined, ShopOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from 'react';

const { Content } = Layout;
const { Title } = Typography;

export default function BusinessSignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values:", values);
  
    // Prepare data to send to the backend
    const businessDataToSend = {
      business_name: values.businessName,        // Changed to snake_case
      phone_number: values.phoneNumber,         // Changed to snake_case
      address: values.address,
      app_suite: values.aptSuite,               // Changed to snake_case
      city: values.city,
      postal_code: values.postalCode,           // Changed to snake_case
      first_name: values.firstName,             // Changed to snake_case
      last_name: values.lastName,               // Changed to snake_case
      email: values.email,
      password: values.password,
      confirm: values.confirm,                   // Included confirm field
      // Optional fields (ensure backend can handle these as optional)
      description: values.description || "",     // Add description if available
      state: values.state || "",                 // Add state if available
      country: values.country || "",             // Add country if available
    };
  
    // Send data to the backend
    try {
      const response = await axios.post(
        "https://vinc-production-3a9e.up.railway.app/api/businesses/profile",
        businessDataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials if your backend uses sessions
        }
      );
      if (response.status === 201) {
        alert("Business registered successfully!");
  
        // Navigate to confirmation page
        navigate("/signup-confirmation");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while registering the business.");
      }
    }
  };
  

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Content style={{ display: "flex" }}>
        {/* Left side with logo */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="/assets/side_image.png" alt="Vinciniti Logo" style={{ maxWidth: "80%" }} />
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
            {/* Form fields */}
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
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
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
              <Input.Password placeholder="Confirm Password" />
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
