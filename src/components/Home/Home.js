import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries';

// COMPONENTS
import Restaurant from '../Restaurant/Restaurant';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Map from '../Map/Map';

import './Home.scss';
import UserSelections from '../UserSelections/UserSelections';

export default function Home() {
  const [updatedResults, setUpdatedResults] = useState([]);
  const { data = {}, error, loading, refetch } = useQuery(RESTAURANTS_QUERY);

  if (loading) return <Loading>loading...</Loading>;
  if (error) return <Error error={error} label="error!" />;
  const originalRestaurants = data.restaurants.results || [];
  const restaurantData = updatedResults.length ? updatedResults : originalRestaurants;
  return (
    <div className="home-container">
      <div className="selections">
        <UserSelections
          originalData={originalRestaurants}
          handleUpdate={setUpdatedResults}
        />
      </div>
      <div className="restaurant-detail">
        <div className="left-side">
          <div className="map">
            <Map data={restaurantData} />
          </div>
        </div>
        <div className="right-side">
          {restaurantData.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
