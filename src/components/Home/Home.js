import { useQuery } from "@apollo/client";
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries'

// COMPONENTS
import Restaurant from "../Restaurant/Restaurant";
import Loading from "../Loading/Loading";

export default function Home() {
  const { data, error, loading } = useQuery(RESTAURANTS_QUERY);

  return (
    loading
      ? <Loading>loading...</Loading>
      : data.restaurants.restaurants.map((restaurant) => <Restaurant key={restaurant.id} restaurant={restaurant} />)
  )
}