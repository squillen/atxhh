import PropTypes from 'prop-types';
import './styles.scss';

export default function Loading({ children }) {
  return (
    <div className='loading-container'>
      <div className='loading-component'>
        <div className='loading' />
        <div className='label'>{children}</div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  children: PropTypes.node.isRequired,
};
