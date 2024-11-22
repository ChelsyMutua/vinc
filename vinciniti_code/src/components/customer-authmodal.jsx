import React from 'react';
import { Form, Button, Modal, Space, message } from 'antd';
import Input from './auth-inputs';
import PropTypes from 'prop-types';

async function signUpUser(values) {
  try {
    const data = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      phone_number: values.phone_number,
    };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return { success: false, message: 'Failed to sign up. Please try again.' };
    }

    let result;
    try {
      result = await response.json();
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return { success: false, message: 'Unexpected server response. Please try again.' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}


async function signInUser(values) {
  try {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}



const CustomerAuthModal = ({ isModalVisible, setIsModalVisible, modalType }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response;
      if (modalType === 'signIn') {
        response = await signInUser(values);
      } else {
        response = await signUpUser(values);
      }
  
      if (response.success) {
        message.success(response.message);
        setIsModalVisible(false);
        // Optionally, fetch user profile or redirect
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  



  const handleForgotPassword = () => {
    // Implement forgot password logic here
    console.log('Forgot Password clicked');
  };

  const renderFormFields = () => {
    if (modalType === 'signIn') {
      return (
        <>
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
            <Button
              htmlType="submit"
              style={{ width: '100%', backgroundColor: '#FE6F61', borderColor: '#FE6F61', color: 'white' }}
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
          <Form.Item>
            <a onClick={handleForgotPassword}>Forgot Password?</a>
          </Form.Item>
        </>
      );
    } else if (modalType === 'signUp') {
      return (
        <>
          <Space style={{ display: 'flex' }} align="baseline">
            <Input
              type="text"
              placeholder="First Name"
              name="first_name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            />
            <Input
              type="text"
              placeholder="Last Name"
              name="last_name"
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
            name="confirm_password"
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
            <Button
              htmlType="submit"
              style={{ width: '100%', backgroundColor: '#FE6F61', borderColor: '#FE6F61', color: 'white' }}
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </>
      );
    }
  };

  return (
    <Modal
      title={modalType === 'signIn' ? 'Sign In to Vinciniti' : 'Sign Up for Vinciniti'}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400}
      style={{ top: 20, padding: '20px 40px' }} // Move padding here
    >
      <Form form={form} onFinish={onFinish} layout="vertical" scrollToFirstError>
        {renderFormFields()}
      </Form>
    </Modal>
  );  
};

CustomerAuthModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  modalType: PropTypes.oneOf(['signIn', 'signUp']).isRequired,
};

export default CustomerAuthModal;

