import PropTypes from "prop-types";

const Container = ({ children }) => (
    <div
      style={{
        paddingTop: '7rem',
        width: "50%",
        margin: "0 auto",
        padding: "0 20px",
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );

  Container.propTypes = {
    children: PropTypes.node.isRequired,
  }

  
export default Container;  