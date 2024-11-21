import React from 'react';
import { Form, Button, Modal, Space, Divider, message } from 'antd';
import Input from './auth-inputs';
import PropTypes from 'prop-types';

const GoogleSignInButton = ({ onClick }) => (
  <Button 
    onClick={onClick}
    style={{ 
      width: '100%', 
      backgroundColor: 'white', 
      borderColor: '#ccc', 
      color: '#757575',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <img 
      src="/assets/search.png" 
      alt="Google" 
      style={{ 
        width: '18px', 
        height: '18px', 
        marginRight: '8px'
      }} 
    />
    Sign in with Google
  </Button>
);

GoogleSignInButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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
        // Handle successful authentication (e.g., update app state, redirect)
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      if (response.success) {
        message.success('Successfully signed in with Google');
        setIsModalVisible(false);
        // Handle successful authentication
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Google Sign In error:', error);
      message.error('An error occurred with Google Sign In. Please try again.');
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
      style={{ top: 20 }}
      bodyStyle={{ padding: '20px 40px' }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" scrollToFirstError>
        {renderFormFields()}
        <Divider plain>or</Divider>
        <Form.Item>
          <GoogleSignInButton onClick={handleGoogleSignIn} />
        </Form.Item>
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

// Pseudo-code for backend integration
async function signInUser(values) {
  // API call to sign in user
  // Check if user exists and password is correct
  // Check if user is verified
  // Return { success: true/false, message: '...' }
}

async function signUpUser(values) {
  // API call to sign up user
  // Create user in database with is_verified set to false and is_google_user set to false
  // Send verification email
  message.success('Please check your email to verify your account');
  // Return { success: true, message: 'Please check your email to verify your account' }
}

async function signInWithGoogle() {
  // Implement Google Sign In
  // Check if user exists in database
  // If not, create new user with is_google_user set to true and is_verified set to true
  // Return { success: true/false, message: '...' }
}