import { Layout, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function SignUpConfirmation() {
  const navigate = useNavigate(); // To navigate to the business dashboard

  const handleGetStarted = () => {
    navigate("/business-dashboard"); // Navigate to the business dashboard
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Content style={{ textAlign: "center" }}>
        <Title level={2}>Sign Up Successful!</Title>
        <Paragraph>
          Thank you for signing up! The next step is to set up your business and get started with Vinciniti.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#FE6F61", borderColor: "#FE6F61", marginTop: "16px" }}
          onClick={handleGetStarted}
        >
          Get Started Now
        </Button>
      </Content>
    </Layout>
  );
}
