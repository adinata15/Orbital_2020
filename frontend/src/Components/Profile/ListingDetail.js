//sizes has issue-> data is jumbled all over when coming back to listingDetail
//add option to close(top right) and set as display image(bottom center) to each images
//remove images and move displayImage around

import React, { Component } from "react";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editListing, deleteListing } from "../../actions/profileActions";

import Image from "../../images/plus.svg";
import CloseImg from "../../images/close.svg";
import DeleteImage from "../../images/delete.svg";

class ListingDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.listing,
			categoryLeft: [],
			newSizes: [],
			displayImage: this.props.listing.images[0],
			itemImages: this.props.listing.images.slice(
				1,
				this.props.listing.images.length
			),
			newDisplayImage: null,
			newDisplayImageURL: null,
			newItemImages: [],
			newItemImagesURL: [],
		};
	}

	componentDidMount() {
		this.transformSizes();

		//adjust category
		let catInt = ["men", "women", "shirt", "skirt", "pants", "shorts", "dress"];
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
		});
	};

	appendData = (data) => {
		//insert image
		let displayImage = this.state.newDisplayImage
			? this.state.newDisplayImage
			: this.state.displayImage;

		//for old images in url form
		let oldImageComb = "";
		this.state.itemImages.forEach((image, idx) => {
			if (idx) oldImageComb = oldImageComb.concat(",", image);
			else oldImageComb = oldImageComb.concat(image);
		});
		data.append("itemImages", oldImageComb);

		//for new file image
		this.state.newItemImages.forEach((image) => {
			data.append("newItemImages", image);
		});

		let categoryStr = "";
		this.state.category.forEach((cat, idx) => {
			if (idx) categoryStr = categoryStr.concat(",", cat);
			else categoryStr = categoryStr.concat(cat);
		});

		//inserting size datas
		this.state.newSizes.forEach((sizeOne, idx) => {
			data.append(`size${idx + 1}`, sizeOne.size.toUpperCase());
			data.append(`size${idx + 1}chest`, sizeOne.chest);
			data.append(`size${idx + 1}bl`, sizeOne.bodylength);
			data.append(`size${idx + 1}waist`, sizeOne.waist);
			data.append(`size${idx + 1}hip`, sizeOne.hip);
			data.append(`size${idx + 1}tl`, sizeOne.totallength);
			data.append(`size${idx + 1}bust`, sizeOne.bust);
			data.append(`size${idx + 1}sl`, sizeOne.skirtlength);
		});

		data.append("category", categoryStr);
		data.append("title", this.state.title);
		data.append("brand", this.state.brand);
		data.append("price", this.state.price);
		data.append("displayImage", displayImage);
		data.append("sizechartunit", this.state.sizechartunit);
		data.append("sizechartmeatype", this.state.sizechartmeatype);
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

	addImage = (e) => {
		this.setState({
			newItemImagesURL: [
				...this.state.newItemImagesURL,
				URL.createObjectURL(e.target.files[0]),
			],
			newItemImages: [...this.state.newItemImages, e.target.files[0]],
		});
	};

	setDisplay = (e) => {
		// let tempURL;
		console.log(e.currentTarget.src);
		let targetName = e.currentTarget.name;
		typeof e.currentTarget.src
			? this.setState({
					displayImage: e.currentTarget.src,
					[e.currentTarget.name]: this.state[targetName].filter(
						//here
						(cat) => cat !== e.currentTarget.name
					),
			  })
			: this.setState({
					newDisplayImage: e.currentTarget.files[0],
					displayImage: null,
					newDisplayImageURL: URL.createObjectURL(e.target.files[0]),
					[e.currentTarget.name]: this.state[targetName].filter(
						//here
						(cat) => cat !== e.currentTarget.name
					),
			  });
	};

	removeImage = (e) => {
		{
			this.setState({
				categoryLeft: [...this.state.categoryLeft, e.currentTarget.value],
				category: this.state.category.filter(
					(cat) => cat !== e.currentTarget.value
				),
			});
		}
	};

	imageItems = () => {
		if (this.state.displayImage || this.state.newDisplayImageURL) {
			return (
				<div
					className={
						"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
					}
				>
					<div
						className={
							"relative flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2"
						}
					>
						<img
							key={-1}
							name={
								this.state.displayImage ? "displayImage" : "newDisplayImage"
							}
							className={"h-32 w-32 mx-1 my-3 object-cover"}
							src={
								this.state.displayImage
									? this.state.displayImage
									: this.state.newDisplayImageURL
							}
							alt={"item picture"}
						/>
						{/* <img
              key={-1}
              className={
                'absolute top-0 right-0 h-5 w-5 mt-4 mr-2 float-right cursor-pointer'
              }
              name={
                this.state.displayImage ? 'displayImage' : 'newDisplayImage'
              }
              src={CloseImg}
              onClick={this.removeImage}
              alt={'item picture'} 
            />*/}
						<p className={"text-sm text-center"}>Display image</p>
					</div>
					{this.state.newItemImagesURL.map((item, index) => (
						<div
							className={
								"relative flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2"
							}
						>
							<img
								key={index}
								name={`newItemImages${index}`}
								className={"h-32 w-32 mx-1 my-3 object-cover"}
								src={item}
								alt={"item picture"}
							/>
							{/* <img
                key={index}
                className={
                  'absolute top-0 right-0 h-5 w-5 mt-4 mr-2 float-right cursor-pointer'
                }
                name={`newItemImages${index}`}
                src={CloseImg}
                onClick={this.removeImage}
                alt={'item picture'}
              />
              <button
                type="button"
                name={`newItemImages${index}`}
                className={
                  'border bg-teal-600 hover:bg-teal-400 rounded text-white px-1 text-sm self-center mb-2'
                }
                onClick={this.setDisplay}
              >
                Set as display
              </button> */}
						</div>
					))}
					{this.state.itemImages.map((item, index) => (
						<div
							className={
								"relative flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2"
							}
						>
							<img
								key={index}
								name={`itemImages${index}`}
								className={"h-32 w-32 mx-1 my-3 object-cover"}
								src={item}
								alt={"item picture"}
							/>
							{/* <img
                key={index}
                name={`itemImages${index}`}
                className={
                  'absolute top-0 right-0 h-5 w-5 mt-4 mr-2 float-right cursor-pointer'
                }
                src={CloseImg}
                onClick={this.removeImage}
                alt={'item picture'}
              />
              <button
                type="button"
                name={`itemImages${index}`}
                className={
                  'border bg-teal-600 hover:bg-teal-400 rounded text-white px-1 text-sm self-center mb-2'
                }
                onClick={this.setDisplay}
              >
                Set as display
              </button> */}
						</div>
					))}
				</div>
			);
		} else {
			return (
				<p className={"text-3xl text-center w-full px-8 font-bold my-3"}>
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
					size: "",
					chest: "",
					bodylength: "",
					waist: "",
					hip: "",
					totallength: "",
					bust: "",
					skirtlength: "",
				},
			],
		}));
	};

	render() {
		if (this.props.accounttype === "buyer") window.location.assign("/");
		console.log(this.state);
		if (!this.props.listing) {
			return <CircularProgress />;
		} else {
			return (
				<form
					onSubmit={this.handleSubmit}
					className={"flex flex-row w-full mx-auto my-6 relative"}
				>
					<div className={"w-1/2 pl-3"}>
						<div className={"w-full"}>
							<label
								className={
									"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								}
							>
								Listing picture
							</label>
							<div className={"flex flex-col rounded border-2 border-dashed"}>
								<img
									className={
										"self-center rounded-full h-16 w-16 my-3 object-cover"
									}
									onClick={() => this.fileInput.click()}
									src={Image}
								/>
								<p
									className={
										"text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
								>
									Click here to add item picture
								</p>
							</div>

							{this.imageItems()}
						</div>

						<input
							type="file"
							name="image"
							accept="image/*"
							// value={this.state.images || this.state.tempImage}
							hidden
							onChange={this.addImage}
							// to link to the button
							ref={(fileInput) => (this.fileInput = fileInput)}
						/>
						<div className={"flex flex-wrap -mx-3"}>
							<div className={"w-full px-3 my-3 "}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="grid-user-id"
								>
									Title
								</label>
								<input
									name="title"
									value={this.state.title}
									className={
										"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
									}
									id="title"
									type="text"
									placeholder="Nike DryFit Pro"
									onChange={this.handleChange}
								/>
							</div>
							<div className={"w-full px-3 my-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="grid-gender"
								>
									Category
								</label>
								<div
									className={
										"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
									}
								>
									{this.state.category[0] ? (
										this.state.category.map((category) => {
											if (category) {
												return (
													<button
														onClick={this.removeCategory}
														type="button"
														value={category}
														name={category}
														className={
															"flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded"
														}
													>
														<div className={"self-center"} value={category}>
															{category}
														</div>
														<img
															className={"float-right ml-1 self-center w-5 h-5"}
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
												"text-3xl text-center w-full px-8 font-bold my-3"
											}
										>
											No catergory picked
										</p>
									)}
								</div>
								<div
									className={
										"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
									}
								>
									{this.state.categoryLeft[0] ? (
										this.state.categoryLeft.map((category) => (
											<button
												onClick={this.addCategory}
												type="button"
												value={category}
												name={category}
												className={
													"flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded"
												}
											>
												<div className={"self-center"} value={category}>
													{category}
												</div>
											</button>
										))
									) : (
										<p
											className={
												"text-3xl text-center w-full px-8 font-bold my-3"
											}
										>
											All catergory picked
										</p>
									)}
								</div>
							</div>
							<div className={"flex w-full my-3"}>
								<div className={"w-1/2 px-3 mb-6"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="grid-user-id"
									>
										Brand
									</label>
									<input
										name="brand"
										className={
											"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
										}
										id="brand"
										type="text"
										placeholder="Jane"
										value={this.state.brand}
										onChange={this.handleChange}
									/>
								</div>
								<div className={"w-1/2 px-3 mb-6"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="grid-weight"
									>
										Price
									</label>
									<input
										name="price"
										step="0.01"
										className={
											"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
										}
										id="price"
										type="number"
										value={this.state.price}
										placeholder="$45.7"
										onChange={this.handleChange}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={"w-1/2"}>
						<div className={"flex"}>
							<div className={"w-1/2 px-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="sizechartunit"
								>
									Measurement unit
								</label>
								<div className={"relative"}>
									<select
										className={
											"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										name="sizechartunit"
										id="sizechartunit"
										onChange={this.handleChange}
									>
										<option
											selected={this.state.sizechartunit === "cm"}
											value="cm"
										>
											cm
										</option>
										<option
											selected={this.state.sizechartunit === "in"}
											value="in"
										>
											inches
										</option>
									</select>
									<div
										className={
											"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black"
										}
									>
										<svg
											className={"fill-current h-4 w-4"}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							<div className={"w-1/2 px-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="sizechartmeatype"
								>
									Measurement type
								</label>
								<div className={"relative"}>
									<select
										className={
											"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										name="sizechartmeatype"
										id="sizechartmeatype"
										onChange={this.handleChange}
									>
										<option
											selected={this.state.sizechartmeatype === "garment"}
											value="garment"
										>
											Cloth sizing
										</option>
										<option
											selected={this.state.sizechartmeatype === "body"}
											value="body"
										>
											Body sizing
										</option>
									</select>
									<div
										className={
											"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black"
										}
									>
										<svg
											className={"fill-current h-4 w-4"}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2 mx-3"
							}
						>
							Size tabel
						</label>
						<table id="tablesizes" className="table-fixed mx-3">
							<thead>
								<tr className="bg-gray-500">
									<th className={"px-2 py-2"}>Size</th>
									<th className={"px-2 py-2"}>Chest</th>
									<th className={"px-2 py-2"}>Body length</th>
									<th className={"px-2 py-2"}>Waist</th>
									<th className={"px-2 py-2"}>Skirt length</th>
									<th className={"px-2 py-2"}>Hip</th>
									<th className={"px-2 py-2"}>Total length</th>
									<th className={"px-2 py-2"}>Bust</th>
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
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="size"
													value={val.size}
													data-id={idx}
													id={size}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="chest"
													value={val.chest}
													id={chest}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="bodylength"
													value={val.bodylength}
													id={bodylength}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="waist"
													id={waist}
													value={val.waist}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="hip"
													value={val.hip}
													id={hip}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="totallength"
													id={totallength}
													value={val.totallength}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="bust"
													id={bust}
													value={val.bust}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 py-2"}>
												<input
													className="w-full"
													type="text"
													name="skirtlength"
													id={skirtlength}
													value={val.skirtlength}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border-l py-2 px-1"}>
												{idx === 0 ? (
													<img
														className={"object-contain"}
														onClick={() => this.addRow()}
														src={Image}
													/>
												) : (
													<img
														className={"object-contain"}
														onClick={() => this.removeRow(val)}
														src={DeleteImage}
													/>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className={"flex absolute bottom-0 right-0"}>
						<button
							type="submit"
							className={
								" bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded"
							}
						>
							Save edit
						</button>

						<button
							type="button"
							className={
								" bg-gray-800 my-2 mx-5 w-auto h-10 hover:bg-gray-600 text-white font-bold px-4 rounded"
							}
							onClick={async () => {
								await this.props.deleteListing(this.state._id);
								this.props.history.push("/store");
							}}
						>
							Delete listing
						</button>
						<Link to="/store">
							<button
								type="button"
								className={
									" bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded"
								}
							>
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
	listing: PropTypes.object.isRequired,
	user_id: PropTypes.string.isRequired,
	accounttype: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	listing: state.auth.user.listing,
	user_id: state.auth.user._id,
	accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { editListing, deleteListing })(
	ListingDetail
);
