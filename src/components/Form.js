import PropTypes from 'prop-types';

export default function Form({ children }) {
  return (
    <form action="" className="form">
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

Form.defaultProps = {
};
