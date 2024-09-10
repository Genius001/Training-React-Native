import React from 'react';
import renderer from 'react-test-renderer';
import ListCar from '../ListCar';

it(`renders correctly`, () => {
  const tree = renderer.create(
    <ListCar
      image={require("@/assets/images/img_photo.png")}
      carName={"Innova"}
      passengers={5}
      baggage={2}
      price={500000}
    />
  ).toJSON();


  expect(tree).toMatchSnapshot();
});
