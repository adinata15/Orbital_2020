import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editListing, deleteListing } from '../../actions/profileActions';

import Image from '../../images/plus.svg';
import CloseImg from '../../images/close.svg';

class ListingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.location.listingInfo,
      isSubmitted: false,
      categoryLeft: [],
      tempImage: this.props.location.listingInfo.images,
      newSizes: [],
      meatype: this.props.location.listingInfo.sizechartmeatype,
      unit: this.props.location.listingInfo.sizechartunit,
    };
    console.log(this.props.location.listingInfo);

    //adjust category
    let catInt = ['men', 'women', 'shirt', 'skirt', 'pants', 'shorts', 'dress'];
    for (var cat in catInt) {
      let distinct = true;
      for (var catUsed in this.state.category) {
        if (catInt[cat] === this.state.category[catUsed]) {
          distinct = false;
          break;
        }
      }

      if (distinct) {
        this.state.categoryLeft.push(catInt[cat]);
      }
    }
  }

  transformSizes = () => {
    //inserting size datas
    this.state.sizes.forEach((val) => {
      this.setState((prevState) => ({
        newSizes: [
          ...prevState.newSizes,
          {
            index: Math.random(),
            size: val.size,
            chest: val.chest
              ? val.chest.from === -1
                ? ``
                : !val.chest.from
                ? `${val.chest}`
                : val.chest.from === val.chest.to
                ? `${val.chest.to}`
                : `${val.chest.from}-${val.chest.to}`
              : ``,
            bodylength: val.bodylength
              ? val.bodylength.from === -1
                ? ``
                : !val.bodylength.from
                ? `${val.bodylength}`
                : val.bodylength.from === val.bodylength.to
                ? `${val.bodylength.to}`
                : `${val.bodylength.from}-${val.bodylength.to}`
              : ``,
            waist: val.waist
              ? val.waist.from === -1
                ? ``
                : !val.waist.from
                ? `${val.waist}`
                : val.waist.from === val.waist.to
                ? `${val.waist.to}`
                : `${val.waist.from}-${val.waist.to}`
              : ``,
            hip: val.hip
              ? val.hip.from === -1
                ? ``
                : !val.hip.from
                ? `${val.hip}`
                : val.hip.from === val.hip.to
                ? `${val.hip.to}`
                : `${val.hip.from}-${val.hip.to}`
              : ``,
            totallength: val.totallength
              ? val.totallength.from === -1
                ? ``
                : !val.totallength.from
                ? `${val.totallength}`
                : val.totallength.from === val.totallength.to
                ? `${val.totallength.to}`
                : `${val.totallength.from}-${val.totallength.to}`
              : ``,
            bust: val.bust
              ? val.bust.from === -1
                ? ``
                : !val.bust.from
                ? `${val.bust}`
                : val.bust.from === val.bust.to
                ? `${val.bust.to}`
                : `${val.bust.from}-${val.bust.to}`
              : ``,
            skirtlength: val.skirtlength
              ? val.skirtlength.from === -1
                ? ``
                : !val.skirtlength.from
                ? `${val.skirtlength}`
                : val.skirtlength.from === val.skirtlength.to
                ? `${val.skirtlength.to}`
                : `${val.skirtlength.from}-${val.skirtlength.to}`
              : ``,
          },
        ],
      }));
      this.state.sizes.shift();
    });
  };

  appendData = (data) => {
    //insert image
    let displayImage = this.state.images.shift();
    this.state.images.forEach((image) => {
      data.append('itemImages', image); //problem here
    });
    let categoryStr = '';
    this.state.category.forEach((cat, idx) => {
      if (idx) categoryStr = categoryStr.concat(',', cat);
      else categoryStr = categoryStr.concat(cat);
    });

    //inserting size datas
    this.state.newSizes.forEach((sizeOne, idx) => {
      data.append(`size${idx + 1}`, sizeOne.size);
      data.append(`size${idx + 1}chest`, sizeOne.chest);
      data.append(`size${idx + 1}bl`, sizeOne.bodylength);
      data.append(`size${idx + 1}waist`, sizeOne.waist);
      data.append(`size${idx + 1}hip`, sizeOne.hip);
      data.append(`size${idx + 1}tl`, sizeOne.totallength);
      data.append(`size${idx + 1}bust`, sizeOne.bust);
      data.append(`size${idx + 1}sl`, sizeOne.skirtlength);
    });

    data.append('category', categoryStr);
    data.append('title', this.state.title);
    data.append('brand', this.state.brand);
    data.append('price', this.state.price);
    data.append('displayImage', displayImage);
    data.append('sizechartunit', this.state.unit);
    data.append('sizechartmeatype', this.state.meatype);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    try {
      this.appendData(data);
      this.props.editListing(data, this.state._id);
      console.log(...data);
      console.log(this.state.images);
      this.setState({ isSubmitted: true });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  handleImage = (e) => {
    this.setState({
      tempImage: [
        ...this.state.tempImage,
        URL.createObjectURL(e.target.files[0]),
      ],
      image: [...this.state.images, e.target.files[0]],
    });
  };

  imageItems = () => {
    let tempImage = this.state.tempImage;
    if (tempImage[0]) {
      return tempImage.map((item, index) =>
        index === 0 ? (
          <div
            className={
              'flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2'
            }>
            <img
              key={index}
              className={'h-32 w-32 mx-1 my-3 object-cover'}
              src={item}
              alt={'item picture'}
            />
            <p className={'text-center'}>Display image</p>
          </div>
        ) : (
          <img
            key={index}
            className={'mx-1 h-32 w-32 my-3 object-cover'}
            src={item}
            alt='item picture'
          />
        )
      );
    } else {
      return (
        <p className={'text-3xl text-center w-full px-8 font-bold my-3'}>
          No image chosen
        </p>
      );
    }
  };
  addCategory = (e) => {
    this.setState({
      category: [...this.state.category, e.currentTarget.value],
      categoryLeft: this.state.categoryLeft.filter(
        (cat) => cat !== e.currentTarget.value
      ),
    });
  };

  removeCategory = (e) =>
    this.setState({
      categoryLeft: [...this.state.categoryLeft, e.currentTarget.value],
      category: this.state.category.filter(
        (cat) => cat !== e.currentTarget.value
      ),
    });

  handleChangeTable = (e) => {
    let sizeChange = [...this.state.newSizes];
    sizeChange[e.target.dataset.id][e.target.name] = e.target.value;
    this.setState({
      newSizes: sizeChange,
    });
  };

  removeRow = (row) => {
    this.setState({
      newSizes: this.state.newSizes.filter((r) => r !== row),
    });
  };

  addRow = () => {
    if (this.state.newSizes.length === 8) return;
    this.setState((prevState) => ({
      newSizes: [
        ...prevState.newSizes,
        {
          index: Math.random(),
          size: '',
          chest: '',
          bodylength: '',
          waist: '',
          hip: '',
          totallength: '',
          bust: '',
          skirtlength: '',
        },
      ],
    }));
  };

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to='/store' />;
    } else {
      this.transformSizes();
      console.log(this.state);
      return (
        <form
          onSubmit={this.handleSubmit}
          className={'flex flex-row w-full mx-auto my-6 relative'}>
          <div className={'w-1/2 pl-3'}>
            <div className={'w-full'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }>
                Listing picture
              </label>
              <div className={'flex flex-col rounded border-2 border-dashed'}>
                <img
                  className={
                    'self-center rounded-full h-16 w-16 my-3 object-cover'
                  }
                  onClick={() => this.fileInput.click()}
                  src={Image}
                />
                <p
                  className={
                    'text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }>
                  Click here to add item picture
                </p>
              </div>
              <div
                className={
                  'flex flex-row flex-wrap justify-around border-2 rounded border-dashed'
                }>
                {this.imageItems()}
              </div>
            </div>

            <input
              type='file'
              name='image'
              accept='image/*'
              // value={this.state.images || this.state.tempImage}
              hidden
              onChange={this.handleImage}
              // to link to the button
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <div className={'flex flex-wrap -mx-3'}>
              <div className={'w-full px-3 my-3 '}>
                <label
                  className={
                    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }
                  for='grid-user-id'>
                  Title
                </label>
                <input
                  name='title'
                  value={this.state.title}
                  className={
                    'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required'
                  }
                  id='title'
                  type='text'
                  placeholder='Nike DryFit Pro'
                  onChange={this.handleChange}
                />
              </div>
              <div className={'w-full px-3 my-3'}>
                <label
                  className={
                    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }
                  for='grid-gender'>
                  Category
                </label>
                <div
                  className={
                    'flex flex-row flex-wrap justify-around border-2 rounded border-dashed'
                  }>
                  {this.state.category[0] ? (
                    this.state.category.map((category) => {
                      if (category) {
                        return (
                          <button
                            onClick={this.removeCategory}
                            type='button'
                            value={category}
                            name={category}
                            className={
                              'flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded'
                            }>
                            <div className={'self-center'} value={category}>
                              {category}
                            </div>
                            <img
                              className={'float-right ml-1 self-center w-5 h-5'}
                              value={category}
                              src={CloseImg}
                            />
                          </button>
                        );
                      }
                    })
                  ) : (
                    <p
                      className={
                        'text-3xl text-center w-full px-8 font-bold my-3'
                      }>
                      No catergory picked
                    </p>
                  )}
                </div>
                <div
                  className={
                    'flex flex-row flex-wrap justify-around border-2 rounded border-dashed'
                  }>
                  {this.state.categoryLeft[0] ? (
                    this.state.categoryLeft.map((category) => (
                      <button
                        onClick={this.addCategory}
                        type='button'
                        value={category}
                        name={category}
                        className={
                          'flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded'
                        }>
                        <div className={'self-center'} value={category}>
                          {category}
                        </div>
                      </button>
                    ))
                  ) : (
                    <p
                      className={
                        'text-3xl text-center w-full px-8 font-bold my-3'
                      }>
                      All catergory picked
                    </p>
                  )}
                </div>
              </div>
              <div className={'flex w-full my-3'}>
                <div className={'w-1/2 px-3 mb-6'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='grid-user-id'>
                    Brand
                  </label>
                  <input
                    name='brand'
                    className={
                      'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required'
                    }
                    id='brand'
                    type='text'
                    placeholder='Jane'
                    value={this.state.brand}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={'w-1/2 px-3 mb-6'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='grid-weight'>
                    Price
                  </label>
                  <input
                    name='price'
                    step='0.01'
                    className={
                      'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required'
                    }
                    id='price'
                    type='number'
                    value={this.state.price}
                    placeholder='$45.7'
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'w-1/2'}>
            <div className={'flex'}>
              <div className={'w-1/2 px-3'}>
                <label
                  className={
                    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }
                  for='unit'>
                  Measurement unit
                </label>
                <div className={'relative'}>
                  <select
                    className={
                      'block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    name='unit'
                    id='unit'
                    value={this.state.unit}
                    onChange={this.handleChange}>
                    <option value='cm'>cm</option>
                    <option value='in'>inches</option>
                  </select>
                  <div
                    className={
                      'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black'
                    }>
                    <svg
                      className={'fill-current h-4 w-4'}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'>
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={'w-1/2 px-3'}>
                <label
                  className={
                    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  }
                  for='meatype'>
                  Measurement type
                </label>
                <div className={'relative'}>
                  <select
                    className={
                      'block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    name='meatype'
                    id='meatype'
                    value={this.state.meatype}
                    onChange={this.handleChange}>
                    <option value='garment'>Cloth sizing</option>
                    <option value='body'>Body sizing</option>
                  </select>
                  <div
                    className={
                      'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black'
                    }>
                    <svg
                      className={'fill-current h-4 w-4'}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'>
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>{' '}
                </div>
              </div>
            </div>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2 mx-3'
              }>
              Size tabel
            </label>
            <table id='tablesizes' className='table-fixed mx-3'>
              <thead>
                <tr className='bg-gray-500'>
                  <th className={'px-2 py-2'}>Size</th>
                  <th className={'px-2 py-2'}>Chest</th>
                  <th className={'px-2 py-2'}>Body length</th>
                  <th className={'px-2 py-2'}>Waist</th>
                  <th className={'px-2 py-2'}>Skirt length</th>
                  <th className={'px-2 py-2'}>Hip</th>
                  <th className={'px-2 py-2'}>Total length</th>
                  <th className={'px-2 py-2'}>Bust</th>
                </tr>
              </thead>
              <tbody>
                {this.state.newSizes.map((val, idx) => {
                  let size = `size${idx}`,
                    chest = `size${idx}chest`,
                    bodylength = `size${idx}bodylength`,
                    waist = `size${idx}waist`,
                    hip = `size${idx}hip`,
                    totallength = `size${idx}totallength`,
                    bust = `size${idx}bust`,
                    skirtlength = `size${idx}skirtlength`;
                  return (
                    <tr key={val.index}>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='size'
                          value={val.size}
                          data-id={idx}
                          id={size}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='chest'
                          value={val.chest}
                          id={chest}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='bodylength'
                          value={val.bodylength}
                          id={bodylength}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='waist'
                          id={waist}
                          value={val.waist}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='hip'
                          value={val.hip}
                          id={hip}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='totallength'
                          id={totallength}
                          value={val.totallength}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='bust'
                          id={bust}
                          value={val.bust}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border px-4 py-2'}>
                        <input
                          className='w-full'
                          type='text'
                          name='skirtlength'
                          id={skirtlength}
                          value={val.skirtlength}
                          data-id={idx}
                          onChange={(e) => this.handleChangeTable(e)}
                        />
                      </td>
                      <td className={'border-l py-2 px-1'}>
                        {idx === 0 ? (
                          <button type='button' onClick={() => this.addRow()}>
                            Add
                            <i aria-hidden='true'></i>
                          </button>
                        ) : (
                          <button
                            type='button'
                            onClick={() => this.removeRow(val)}>
                            Delete
                            <i aria-hidden='true'></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={'flex absolute bottom-0 right-0'}>
            <button
              type='submit'
              className={
                ' bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
              }>
              Save edit
            </button>

            <Link to='/store'>
              <button
                type='button'
                className={
                  ' bg-gray-800 my-2 mx-5 w-auto h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                }
                onClick={() => this.props.deleteListing(this.state._id)}>
                Delete listing
              </button>
              <button
                type='button'
                className={
                  ' bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                }>
                Back
              </button>
            </Link>
          </div>
        </form>
      );
    }
  }
}

ListingDetail.propTypes = {
  editListing: PropTypes.func,
  deleteListing: PropTypes.func,
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   accounttype: state.auth.user.accounttype,
// });

export default connect(null, { editListing, deleteListing })(ListingDetail);

// class ListingDetail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ...this.props.location.listingInfo,
//     };
//     console.log(this.props.location);
//   }

//   editItem = () => {
//     let data = { ...this.state };
//     this.props.editListing(data, this.state._id);
//   };

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   render() {
//     return (
//       <div
//         className={
//           'font-sans antialiased text-gray-900 leading-normal tracking-wider'
//         }>
//         <div
//           className={
//             'max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0'
//           }>
//           <div
//             className={
//               'w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'
//             }>
//             <div className={'p-4 text-center '}>
//               <div className={'w-full px-3 mb-6'}>
//                 <label
//                   className={
//                     'block uppercase tracking-wide text-black text-xs font-bold mb-2'
//                   }
//                   for='quantity'>
//                   Title
//                 </label>
//                 <input
//                   name='title'
//                   className={
//                     'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
//                   }
//                   id='title'
//                   type='text'
//                   value={this.state.title}
//                   onChange={this.handleChange}
//                 />
//               </div>

//               <div className={'w-1/2 px-3 mb-6 '}>
//                 <label
//                   className={
//                     'block uppercase tracking-wide text-black text-xs font-bold mb-2'
//                   }
//                   for='quantity'>
//                   Price
//                 </label>
//                 <input
//                   name='price'
//                   className={
//                     'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
//                   }
//                   id='title'
//                   type='number'
//                   value={this.state.price}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className={'w-1/2 px-3 mb-6 '}>
//                 <label
//                   className={
//                     'block uppercase tracking-wide text-black text-xs font-bold mb-2'
//                   }
//                   for='quantity'>
//                   Brand
//                 </label>
//                 <input
//                   name='brand'
//                   className={
//                     'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
//                   }
//                   id='quantity'
//                   type='text'
//                   value={this.state.brand}
//                   onChange={this.handleChange}
//                 />
//               </div>
//             </div>

//             <div className={'flex flex-wrap -mx-3 '}>
//               <div className={'w-full  md:w-1/2 px-3 md:mb-0'}>
//                 <label
//                   className={
//                     'block uppercase tracking-wide text-black text-xs font-bold mb-2'
//                   }
//                   for='size'>
//                   Category
//                 </label>
//                 <div>
//                   <select
//                     value={this.state.category}
//                     className={
//                       'block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
//                     }
//                     id='size'
//                     onChange={this.handleChange}>
//                     <option value='man'>Man</option>
//                     <option value='woman'>Woman</option>
//                     <option value='others'>Others</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* <p
//                 name='sizes'
//                 className={
//                   'pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start'
//                 }>
//                 Available sizes
//               </p> */}

//             <div className={'flex pt-8 pb-8'}>
//               <button
//                 onClick={this.editItem}
//                 className={
//                   'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
//                 }>
//                 Save edit
//               </button>
//               <button
//                 onClick={() => this.props.deleteListing(this.state._id)}
//                 className={
//                   'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
//                 }>
//                 Delete listing
//               </button>
//               <button
//                 onClick={this.props.onClose}
//                 className={
//                   'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
//                 }>
//                 Back
//               </button>
//             </div>
//             <p className={'text-sm text-red-600'}>{this.state.alert}</p>
//           </div>
//         </div>
//         <div className={'lg:w-1/5 lg:h-auto inset-y-0 right-0'}>
//           <img
//             src={this.state.imagess[0]}
//             className={
//               'rounded-none w-auto h-auto lg:rounded-lg shadow-2xl hidden lg:block'
//             }
//           />
//         </div>
//       </div>
//     );
//   }
// }

// ListingDetail.propTypes = {
//   editListing: PropTypes.func,
//   deleteListing: PropTypes.func,
// };

// export default connect(null, { editListing, deleteListing })(ListingDetail);

// data.append(`size${idx + 1}`, sizeOne.size);
// if (sizeOne.chest.from)
//   data.append(
//     `size${idx + 1}chest`,
//     `${sizeOne.chest.from}-${sizeOne.chest.to}`
//   );
// else {
//   data.append(`size${idx + 1}chest`, `${sizeOne.chest}`);
// }

// if (sizeOne.skirtlength.from)
//   data.append(
//     `size${idx + 1}sl`,
//     `${sizeOne.skirtlength.from}-${sizeOne.skirtlength.to}`
//   );
// else {
//   data.append(`size${idx + 1}sl`, `${sizeOne.skirtlength}`);
// }

// if (sizeOne.bust.from)
//   data.append(
//     `size${idx + 1}bust`,
//     `${sizeOne.bust.from}-${sizeOne.bust.to}`
//   );
// else {
//   data.append(`size${idx + 1}bust`, `${sizeOne.bust}`);
// }
// if (sizeOne.totallength.from)
//   data.append(
//     `size${idx + 1}tl`,
//     `${sizeOne.totallength.from}-${sizeOne.totallength.to}`
//   );
// else {
//   data.append(`size${idx + 1}tl`, `${sizeOne.totallength}`);
// }
// if (sizeOne.hip.from)
//   data.append(
//     `size${idx + 1}hip`,
//     `${sizeOne.hip.from}-${sizeOne.hip.to}`
//   );
// else {
//   data.append(`size${idx + 1}hip`, `${sizeOne.hip}`);
// }
// if (sizeOne.waist.from)
//   data.append(
//     `size${idx + 1}waist`,
//     `${sizeOne.waist.from}-${sizeOne.waist.to}`
//   );
// else {
//   data.append(`size${idx + 1}waist`, `${sizeOne.waist}`);
// }
// if (sizeOne.bodylength.from)
//   data.append(
//     `size${idx + 1}bl`,
//     `${sizeOne.bodylength.from}-${sizeOne.bodylength.to}`
//   );
// else {
//   data.append(`size${idx + 1}bl`, `${sizeOne.bodylength}`);
// }
