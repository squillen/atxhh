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
  const [selections, setSelections] = useState({});
  const { data = {}, error, loading, refetch } = useQuery(RESTAURANTS_QUERY, {
    variables: { ...selections },
  });
  useEffect(() => {
    console.log('refetching')
    refetch();
  }, [selections]);
  const { restaurants = {} } = data;
  const restaurantData = restaurants.results || [];
  if (loading) return <Loading>loading...</Loading>;
  if (error) return <Error error={error} label="error!" />;
  return (
    restaurantData && (
      <div className="home-container">
        <div className="left-side">
          <div className="selections">
            <UserSelections
              data={restaurantData}
              handleUpdate={setSelections}
            />
          </div>
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
    )
  );
}
