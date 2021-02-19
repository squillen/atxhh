import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './Form.scss';

export default function Form({ children, buttonLabel, onClick }) {
  return (
    <form action="" className="form">
      {children}
      <center>
        <Button label={buttonLabel} onClick={onClick} />
      </center>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
