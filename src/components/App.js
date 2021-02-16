import React from "react";
import { useQuery } from "@apollo/client";
import { RESTAURANTS_QUERY } from '../utils/graphql/queries'
import "../styles/App.css";
import Restaurant from "./Restaurant/Restaurant";
import Loading from "./Loading/Loading";

function App() {
  const { data, error, loading } = useQuery(RESTAURANTS_QUERY);
  return (
    <div className="App">
      {
        loading
          ? <Loading>loading...</Loading>
          : data.restaurants.restaurants.map((restaurant) => <Restaurant key={restaurant.id} restaurant={restaurant} />)
      }
    </div>
);
}

export default App;
