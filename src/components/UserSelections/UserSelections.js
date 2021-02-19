import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';

export default function UserSelections({ data }) {
  const [userSelections, setUserSelections] = useState({
    food: true,
    drink: true,
    cuisine: 'American',
    price: 1,
    nights: [new Date().getDay()],
  });
  const [cuisines, setCuisines] = useState([]);
  useEffect(() => {
    if (!cuisines.length) {
      console.log('data :>> ', data);
      const newCuisines = Object.keys(
        data.reduce((obj, el) => {
          const objCopy = { ...obj };
          objCopy[el.cuisine] = el.cuisine;
          return objCopy;
        }, {})
      );
      setCuisines(newCuisines);
    }
  }, [data]);
  return (
    <Form>
      <div className="checkbox__selections">
        <h3 className="checkbox__selections--header">I want to:</h3>
        <div className="checkbox__selections--selection">
          <label className="checkbox--label" htmlFor="eat">
            eat
          </label>
          <input
            checked={userSelections.food}
            onClick={() =>
              setUserSelections({
                ...userSelections,
                food: !userSelections.food,
              })
            }
            className="checkbox--input"
            type="checkbox"
            name="eat"
            value="eat"
          />
        </div>
        <div className="checkbox__selections--selection">
          <label className="checkbox--label" htmlFor="drink">
            drink
          </label>
          <input
            onClick={() =>
              setUserSelections({
                ...userSelections,
                drink: !userSelections.drink,
              })
            }
            checked={userSelections.drink}
            className="checkbox--input"
            type="checkbox"
            name="drink"
            value="eat"
          />
        </div>
      </div>
      <div className="dropdowns">
        <select name="cuisines" id="cuisines">
          {cuisines.map((c) => (
            <option>{c}</option>
          ))}
        </select>
        <select name="price" id="price">
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
      </div>
    </Form>
  );
}

UserSelections.propTypes = {
  data: PropTypes.array.isRequired,
};
