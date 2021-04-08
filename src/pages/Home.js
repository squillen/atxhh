import { useState } from 'react';
import useRestaurants from '../graphql/useRestaurants';

// COMPONENTS
import Loading from '../components/Loading';
import Error from '../components/Error';

import UserSelections from '../components/UserSelections';
import MapWithRestaurant from '../components/MapWithRestaurant';
import RestaurantsContainer from '../components/Restaurants';
import Layout from '../components/Layout';

export default function Home() {
  const [updatedResults, setUpdatedResults] = useState([]);
  const [showSelections, setShowSelections] = useState(false);
  const { restaurants, error, loading } = useRestaurants();

  if (error) return <Error error={error} label='error!' />;
  if (loading) return <Loading>getting restaurants...</Loading>;

  const originalRestaurants = restaurants || [];
  const restaurantData = updatedResults || originalRestaurants;

  return (
    <Layout>
      <div className='home-container'>
        <UserSelections
          originalData={originalRestaurants}
          showSelections={showSelections}
          handleUpdate={setUpdatedResults}
          setShowSelections={setShowSelections}
        />
        {restaurantData.length ? (
          <div
            className='restaurants-section'
            onClick={showSelections ? () => setShowSelections(false) : null}
          >
            <div className='restaurant-detail'>
              <MapWithRestaurant restaurantData={restaurantData} />
              <RestaurantsContainer data={restaurantData} />
            </div>
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
