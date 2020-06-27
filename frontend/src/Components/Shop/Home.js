import React from 'react';
import Card from './Card.js';
import axios from 'axios';

class ShopBar extends React.Component {
  constructor(props) {
    super(props);
  }
  getitem = () => {
    axios
      .get(`http://localhost:5000/category/${this.props.category}`)
      .then(res => {
        console.log(res.data);
        alert('Editted user data');
      })
      .catch(err => {
        console.error(err);
        alert('Edit fail');
      });
  };
  render() {
    return (
      <div class="flex flex-wrap justify-center mb-3 border-solid border-2 rounded">
        <Card class="flex-none" />
        <Card class="flex-none" />
        <Card class="flex-none" />
        <Card class="flex-none" />
        <Card class="flex-none" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
        <Card class="flex-none" loading="lazy" />
      </div>
    );
  }
}

export default ShopBar;
