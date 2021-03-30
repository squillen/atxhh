import PropTypes from 'prop-types';

export default function BackgroundImageDiv({ image, styles }) {
  return (
    <div
      className='image-div'
      style={{
        background: `url(${image}) center no-repeat`,
        backgroundSize: 'cover',
        ...styles,
      }}
    />
  );
}

BackgroundImageDiv.defaultProps = {
  styles: {},
};

BackgroundImageDiv.propTypes = {
  image: PropTypes.string.isRequired,
  styles: PropTypes.object,
};
