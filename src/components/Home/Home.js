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
  const { data, error, loading } = useQuery(RESTAURANTS_QUERY);
  if (loading) return <Loading>loading...</Loading>;
  if (error) return <Error error={error} label="error!" />;
  const restaurants = data.restaurants.restaurants || [];
  return (
    restaurants && (
      <div className="home-container">
        <div className="left-side">
          <div className="selections">
            <UserSelections data={restaurants} />
          </div>
          <div className="map">
            <Map data={restaurants} />
          </div>
        </div>
        <div className="right-side">
          {restaurants.map((restaurant) => (
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    )
  );
}
