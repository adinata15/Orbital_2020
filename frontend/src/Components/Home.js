import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuSelect } from '../actions/menuSelect';

import Men from '../images/men.png';
import Women from '../images/women.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          'flex flex-col sm:flex-row text-gray-700 text-center bg-gray-400 m-2'
        }>
        <Link
          onClick={(e) => this.props.menuSelect(e.target.name)}
          name='men'
          to='/shop'>
          <img
            onClick={(e) => this.props.menuSelect(e.target.name)}
            name='men'
            className={'hover:opacity-75 object-cover'}
            src={Men}
          />
        </Link>
        {/* </div>
        <div class=' text-gray-700 text-center bg-gray-400 m-2'> */}
        <Link
          onClick={(e) => this.props.menuSelect(e.target.name)}
          name='women'
          to='/shop'>
          <img
            onClick={(e) => this.props.menuSelect(e.target.name)}
            name='men'
            className={'hover:opacity-75 object-cover'}
            src={Women}
          />
        </Link>
      </div>
    );
  }
}

Home.propTypes = {
  menuSelect: PropTypes.func.isRequired,
};

export default connect(null, { menuSelect })(Home);
