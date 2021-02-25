import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.scss';

export default function Form({ children, buttonLabel, onClick }) {
  return (
    <form action="" className="form">
      {children}
      {buttonLabel && (
        <center>
          <Button label={buttonLabel} onClick={onClick} />
        </center>
      )}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
};

Form.defaultProps = {
  buttonLabel: '',
  onClick: () => {},
};