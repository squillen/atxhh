import { useQuery } from '@apollo/client';
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries';

// COMPONENTS
import Restaurant from '../Restaurant/Restaurant';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

export default function Home() {
  const { data, error, loading } = useQuery(RESTAURANTS_QUERY);
  if (loading) return <Loading>loading...</Loading>;
  if (error)
    return (
      <Error
        error={error}
        label="error!"
      />
    );
  return data.restaurants.restaurants.map((restaurant) => (
    <Restaurant key={restaurant.id} restaurant={restaurant} />
  ));
}
