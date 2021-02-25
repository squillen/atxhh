import './styles.scss';

export default function BackgroundImageDiv({ image }) {
  return (
    <div
      className="image-div"
      style={{
        background: `url(${image}) center no-repeat`,
        backgroundSize: 'cover',
      }}
    />
  );
}
