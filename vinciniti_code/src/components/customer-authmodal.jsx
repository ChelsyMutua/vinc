import { Form, Button, Modal, Space } from 'antd';
import Input from './auth-inputs';
import PropTypes from 'prop-types'; // Import PropTypes
// import { useState } from 'react';

// const { Title } = Typography;

const CustomerAuthModal = ({ isModalVisible, setIsModalVisible, modalType }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal on cancel
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  // Conditional title and form fields based on modalType (signIn or signUp)
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
            >
              Sign In
            </Button>
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
            >
              Sign Up
            </Button>
          </Form.Item>
        </>
      );
    }
  };

  return (
    <>
      {/* Modal for Sign In and Sign Up Form */}
      <Modal
        title={modalType === 'signIn' ? 'Sign In to Vinciniti' : 'Sign Up for Vinciniti'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered // Ensures the modal is vertically and horizontally centered
        width={400} // Set custom width to make it slim
        style={{ top: 20 }} // Adjust the vertical spacing if needed
        bodyStyle={{ padding: '20px 40px' }} // Custom padding for a slim look
      >
        <Form form={form} onFinish={onFinish} layout="vertical" scrollToFirstError>
          {renderFormFields()}
        </Form>
      </Modal>
    </>
  );
};

// Add PropTypes for prop validation
CustomerAuthModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired, // Validate isModalVisible as a required boolean
  setIsModalVisible: PropTypes.func.isRequired, // Validate setIsModalVisible as a required function
  modalType: PropTypes.oneOf(['signIn', 'signUp']).isRequired, // Validate modalType as 'signIn' or 'signUp'
};

export default CustomerAuthModal;
