import { Form, Button, Modal } from 'antd';
import Input from './auth-inputs';
import PropTypes from 'prop-types'; // Import PropTypes

const CustomerSignin = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal on cancel
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <>
      {/* Modal for Sign In Form */}
      <Modal
        title="Sign In to Vinciniti"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered // Ensures the modal is vertically and horizontally centered
        width={370} // Set custom width to make it slim
        style={{ top: 20 }} // Adjust the vertical spacing if needed
        bodyStyle={{ padding: '20px 40px' }} // Custom padding for a slim look
      >
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
            <Button 
              htmlType="submit" 
              style={{ width: '100%', backgroundColor: '#FE6F61', borderColor: '#FE6F61', color: 'white' }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// Add PropTypes for prop validation
CustomerSignin.propTypes = {
  isModalVisible: PropTypes.bool.isRequired, // Validate isModalVisible as a required boolean
  setIsModalVisible: PropTypes.func.isRequired, // Validate setIsModalVisible as a required function
};

export default CustomerSignin;
