import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

export default function BackgroundImageDiv({ images, styles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const noOfImages = images && images.length - 1;
  if (!noOfImages) return null;
  const handleClick = () => (direction) => {
    if (direction < 0) {
      if (currentIndex === 0) setCurrentIndex(noOfImages);
      else setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === noOfImages) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);
  };
  return (
    <div className='background-image-container'>
      <div
        className='background-image--image'
        style={{
          backgroundImage: `url(${images[currentIndex].img})`,
          ...styles,
        }}
      >
        {noOfImages >= 1 && (
          <>
            <div className='image-toggle-container' onClick={handleClick(-1)}>
              <img
                className='image-toggle'
                src='./svgs/chevron-left.svg'
                alt='previous'
              />
            </div>
            <div className='image-toggle-container' onClick={handleClick(1)}>
              <img
                className='image-toggle'
                src='./svgs/chevron-right.svg'
                alt='next'
              />
            </div>
          </>
        )}
      </div>
      <div className='title'>
        <ReactMarkdown>{images[currentIndex].title}</ReactMarkdown>
      </div>
    </div>
  );
}

BackgroundImageDiv.defaultProps = {
  styles: {},
};

BackgroundImageDiv.propTypes = {
  images: PropTypes.array.isRequired,
  styles: PropTypes.object,
};
