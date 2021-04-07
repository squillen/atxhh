import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import '../styles/main.scss';

export default function AboutPage() {
  return (
    <Layout>
      <div className='about-container'>
        <p>
          As a{' '}
          <a target='_blank' href='https://seanquillen.com' rel='noreferrer'>
            web developer
          </a>
          , I created this site to learn some new technologies (TypeScript and
          GraphQL, if you&apos;re curious). As a human being and lover of food
          and drinks, I created this site to have a simple, user-friendly list
          of restaurants to go to during those happiest of hours.
        </p>
        <p>
          There are several great sites out there, like{' '}
          <span>
            <a
              target='_blank'
              href='https://www.atasteofkoko.com/visit-austin/best-happy-hours-in-austin'
              rel='noreferrer'
            >
              A Taste of Koko
            </a>
          </span>
          {', '}
          <span>
            <a
              target='_blank'
              href='https://www.thrillist.com/drink/austin/best-happy-hours-in-austin'
              rel='noreferrer'
            >
              Thrillist
            </a>
          </span>
          {', and '}
          <span>
            <a
              target='_blank'
              href='https://www.theinfatuation.com/austin/guides/best-happy-hour-austin'
              rel='noreferrer'
            >
              The Infatuation
            </a>
          </span>
          , all of which I used for this site, but I wanted a simple site
          devoted solely to Austin&apos;s happy hours. No fuss, no muss, just
          delicious, preferably fried pork butts.
        </p>
        {/* <p>
          If you enjoy it, head over to the{' '}
          <Link to='/contact'>contact page</Link> and let me know! If you
          don&apos;t enjoy it, you can still let me know...jackass.
        </p> */}
      </div>
    </Layout>
  );
}