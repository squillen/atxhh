import { useQuery } from '@apollo/client';
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries';

// COMPONENTS
import Restaurant from '../Restaurant/Restaurant';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Map from '../Map/Map';

export default function Home() {
  const { data, error, loading } = useQuery(RESTAURANTS_QUERY);
  if (loading) return <Loading>loading...</Loading>;
  if (error) return <Error error={error} label="error!" />;
  const restaurants = data.restaurants.restaurants || [];
  return (
    <div className="home-container">
      <div className="map">
        <Map data={restaurants} />
      </div>
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
