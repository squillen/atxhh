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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { data = {}, error, loading } = useQuery(RESTAURANTS_QUERY);

  if (error) return <Error error={error} label="error!" />;

  const originalRestaurants =
    (data.restaurants && data.restaurants.results) || [];
  const restaurantData =
    updatedResults && updatedResults.length
      ? updatedResults
      : originalRestaurants;
  useEffect(() => {
    if (
      !selectedRestaurant &&
      data &&
      data.restaurants &&
      data.restaurants.results
    ) {
      setSelectedRestaurant(data.restaurants.results[0]);
    }
  }, [data]);
  return (
    <div className="home-container">
      {loading ? (
        <Loading>loading...</Loading>
      ) : (
        <>
          <div className="selections">
            <UserSelections
              originalData={originalRestaurants}
              handleUpdate={setUpdatedResults}
            />
          </div>
          <div className="restaurant-detail">
            <div className="left-side">
              <div className="map">
                <Map
                  data={restaurantData}
                  onClick={setSelectedRestaurant}
                  selectedRestaurant={selectedRestaurant}
                />
              </div>
            </div>
            <div className="right-side">
              {selectedRestaurant && (
                <div className="hero">{selectedRestaurant.name}</div>
              )}
            </div>
          </div>
          <div className="restaurants-container">
            {restaurantData.map((restaurant) => (
              <Restaurant key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
