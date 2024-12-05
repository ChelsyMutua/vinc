
import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Layout, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PhoneOutlined, EnvironmentOutlined, ShopOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { businessData } from "./businessData";
import axios from "axios";
import { Marker } from '@react-google-maps/api';
import MapLocation from './map_location';



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

  const navigate = useNavigate(); // To navigate to the confirmation screen
    // State for business locations
    const [businessLocations, setBusinessLocations] = useState([]);

// Fetch business locations
useEffect(() => {
  axios
    .get("/api/businesses")
    .then((response) => {
      setBusinessLocations(response.data);
    })
    .catch((error) => {
      console.error("Error fetching business locations:", error);
    });
}, []);

function getFullAddress(business) {
  const { address, apartmentSuite, city, postalCode } = business;
  let fullAddress = address;

  if (apartmentSuite) {
    fullAddress += `, ${apartmentSuite}`;
  }

  fullAddress += `, ${city}, ${postalCode}`;
  return fullAddress;
}

async function geocodeAddress(address) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      console.error("Geocoding failed:", response.data.status);
      return null;
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}

const onFinish = async (values) => {
  console.log("Received values:", values);

  // Combine address components
  const fullAddress = getFullAddress({
    address: values.address,
    apartmentSuite: values.aptSuite, // Corrected key
    city: values.city,
    postalCode: values.postalCode,
  });

  // Geocode the address
  const coordinates = await geocodeAddress(fullAddress);

  if (!coordinates) {
    alert("Unable to determine location from the provided address.");
    return;
  }

  // Prepare data to send to the backend, including coordinates
  const businessDataToSend = {
    ...values,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  };

  // Send data to the backend
  try {
    const response = await axios.post("/api/businesses", businessDataToSend);
    if (response.status === 201) {
      alert("Business registered successfully!");
      navigate("/signup-confirmation");
    }
  } catch (error) {
    console.error("Error registering business:", error);
    alert("An error occurred while registering the business.");
  }
};

const categories = businessData.map((category) => category.category);

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

          <MapLocation>
          {businessLocations.map((business) => (
              <Marker
                key={business.id}
                position={{ lat: business.latitude, lng: business.longitude }}
                title={business.name}
              />
            ))}
          </MapLocation>
        </div>
      </Content>
    </Layout>
  );
}
