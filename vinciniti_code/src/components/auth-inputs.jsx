import PropTypes from 'prop-types'; // 1. Import PropTypes
import { Form, Input as AntInput } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const getIcon = (type) => {
  switch (type) {
    case 'email':
      return <MailOutlined />;
    case 'password':
      return <LockOutlined />;
    default:
      return <UserOutlined />;
  }
};

const Input = ({ type, placeholder, name, rules = [] }) => {
  const InputComponent = type === 'password' ? AntInput.Password : AntInput;

  return (
    <Form.Item
      name={name}
      rules={rules}
    >
      <InputComponent
        prefix={getIcon(type)}
        type={type}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

// 2. Define prop types for validation
Input.propTypes = {
  type: PropTypes.string,           // `type` should be a string (e.g., 'text', 'password')
  placeholder: PropTypes.string,    // `placeholder` should be a string
  name: PropTypes.string.isRequired, // `name` is required and should be a string
  rules: PropTypes.arrayOf(PropTypes.object), // `rules` should be an array of objects (AntD validation rules)
};

// 3. Define default props (optional)
Input.defaultProps = {
  type: 'text',
  placeholder: '',
  rules: [],
};

export default Input;
