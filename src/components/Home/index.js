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
  const restaurantData = updatedResults || originalRestaurants;
  useEffect(() => {
    if (restaurantData) {
      setSelectedRestaurant(restaurantData[0]);
    }
  }, [restaurantData]);

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
  // TODO clean up how this is rendered (i.e. better loading)
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
      <div
        className="restaurants-section"
        onClick={showSelections ? () => setShowSelections(false) : null}
      >
        {loading ? (
          <Loading>loading...</Loading>
        ) : (
          <div className="restaurant-detail">
            {/* MAP SECTION */}
            <div className="map-section">
              <div className="left-side">
                {selectedRestaurant && (
                  <div className="map">
                    <Map
                      data={restaurantData}
                      onClick={setSelectedRestaurant}
                      selectedRestaurant={selectedRestaurant}
                    />
                  </div>
                )}
              </div>
              <div className="right-side">
                {selectedRestaurant ? (
                  <div className="hero-container">
                    <div
                      onClick={() =>
                        window.open(selectedRestaurant.url, '_blank')
                      }
                      className="image-div"
                      style={{
                        background: `url(${selectedRestaurant.image}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <RestaurantDetails restaurant={selectedRestaurant} />
                  </div>
                ) : (
                  <div className="no-results">no results!</div>
                )}
              </div>
            </div>
            <div className="restaurants-container">
              <h2 className="restaurants-container__header">
                {`${restaurantData.length} Restaurants:`}
              </h2>
              <div className="restaurants-container__restaurants">
                {restaurantData.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="restaurants-container__restaurants--restaurant"
                  >
                    <div
                      className="restaurant-image-div"
                      onClick={() => window.open(restaurant.url, '_blank')}
                      style={{
                        background: `url(${restaurant.image}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <RestaurantDetails restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
