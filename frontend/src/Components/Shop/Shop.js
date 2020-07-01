import React from 'react';
import Card from './Card.js';
import axios from 'axios';
import Carousel from '../Carousel';

class ShopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  getitem = () => {
    let self = this;
    axios
      .get(`http://localhost:5000/api/items/category/${this.props.category}`)
      .then((res) => {
        self.setState({
          items: res.data,
        });
        console.log(self.items);
        console.log(res.data);
        // alert("Loaded shop items");
      })
      .catch((err) => {
        console.error(err);
        // alert("Load fail");
      });
  };
  componentWillMount() {
    this.getitem();
  }
  render() {
    let item = this.state.items;
    return (
      <div>
        <Carousel />
        <div class='flex flex-wrap justify-center mb-3 border-solid border-2 rounded'>
          {item.map((item) => (
            <Card
              token={this.props.token}
              key={item._id}
              item={item}
              class='flex-none'
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ShopBar;
