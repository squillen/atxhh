import { useState, useEffect } from 'react';
import { useRestaurants } from '../graphql/useRestaurants';

// COMPONENTS
import Loading from '../components/Loading';
import Error from '../components/Error';
import UserSelections from '../components/UserSelections';
import MapWithRestaurant from '../components/MapWithRestaurant';
import RestaurantsContainer from '../components/RestaurantsContainer';
import Layout from '../components/Layout';

export default function Home() {
  // STATE
  const [userSearchQuery, setUserSearchQuery] = useState({});
  const [showSelections, setShowSelections] = useState(false);
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const { restaurants, error, loading } = useRestaurants({
    AND: userSearchQuery,
  });

  // EFFECTS
  useEffect(() => {
    if (restaurants && !originalRestaurants.length)
      setOriginalRestaurants(restaurants);
  }, [restaurants]);

  // RETURNS
  if (error) return <Error error={error} label='error!' />;
  if (loading && !originalRestaurants.length)
    return (
      <Layout>
        <Loading>getting restaurants...</Loading>
      </Layout>
    );
  return (
    <Layout>
      <div className='home-container'>
        <UserSelections
          originalRestaurants={originalRestaurants}
          showSelections={showSelections}
          handleSearchUpdate={setUserSearchQuery}
          setShowSelections={setShowSelections}
        />
        {restaurants ? (
          <div
            className='restaurants-section'
            onClick={showSelections ? () => setShowSelections(false) : null}
          >
            <MapWithRestaurant restaurantData={restaurants} />
            <RestaurantsContainer restaurantData={restaurants} />
          </div>
        ) : (
          <div className='no-restaurants'>
            No restaurants match your filters.
          </div>
        )}
      </div>
    </Layout>
  );
}
