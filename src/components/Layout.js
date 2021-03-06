import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, metaDescription }) {
  return (
    <div className='layout-container'>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={metaDescription} />
      </Helmet>
      <Header />
      <main className='main-container'>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  metaDescription: PropTypes.string,
};

Layout.defaultProps = {
  metaDescription:
    'An ever-growing list of happy hours restaurants in Austin, TX. Find out where to drink, eat, and be social in Austin.',
};
