import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries';

// COMPONENTS
import RestaurantDetails from '../RestaurantDetails';
import BackgroundImageDiv from '../BackgroundImageDiv';
import Loading from '../Loading';
import Error from '../Error';
import Map from '../Map';

import './styles.scss';
import UserSelections from '../UserSelections';
import Toggle from '../Toggle';

export default function Home() {
  const [updatedResults, setUpdatedResults] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showSelections, setShowSelections] = useState(false);
  const [atTop, setAtTop] = useState(false);
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

  useEffect(() => {
    function checkIfAtTop() {
      const isTop = window.scrollY > 150;
      setAtTop(isTop);
    }
    document.addEventListener('scroll', checkIfAtTop);
    return () => {
      document.removeEventListener('scroll', checkIfAtTop);
    };
  }, []);
  return (
    <div className="home-container">
      <div
        className={
          atTop ? 'selections-container--white' : 'selections-container'
        }
      >
        <Toggle
          toggle={showSelections}
          showLabel="Show filter"
          hideLabel="Hide filter"
          onClick={() => setShowSelections(!showSelections)}
        />
        <div
          className={showSelections ? 'selections--show' : 'selections--hide'}
        >
          <UserSelections
            originalData={originalRestaurants}
            handleUpdate={setUpdatedResults}
          />
        </div>
      </div>
      <div className="">
        {loading ? (
          <Loading>loading...</Loading>
        ) : (
          <>
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
                  <div className="hero-container">
                    <div className="hero-container--image">
                      <BackgroundImageDiv image={selectedRestaurant.image} />
                    </div>
                    <RestaurantDetails restaurant={selectedRestaurant} />
                  </div>
                )}
              </div>
            </div>
            <div className="restaurants-container">
              <h2 className="restaurants-container--header">Restaurants:</h2>
              <div className="restaurants-container__restaurants">
                {restaurantData.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="restaurants-container__restaurants--restaurant"
                  >
                    <div className="restaurant--image">
                      <BackgroundImageDiv image={restaurant.image} />
                    </div>
                    <RestaurantDetails restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}