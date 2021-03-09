import PropTypes from 'prop-types';
import './styles.scss';

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
