import PropTypes from 'prop-types';

export default function Loading({ children }) {
  return (
    <div className="loading">
      {children}
    </div>
  )
}

Loading.propTypes = {
  children: PropTypes.node.isRequired
}