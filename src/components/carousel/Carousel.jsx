import React, { useRef } from "react";
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading }) => {
	const carouselContainer = useRef();

	const { url } = useSelector((state) => state.home);

	const navigate = useNavigate();

	const navigation = (dir) => {
		const container = carouselContainer.current;
		const scrollAmount =
			dir === "left"
				? container.scrollLeft - (container.offsetWidth + 20) //set css offset
				: container.scrollLeft + (container.offsetWidth + 20);
		container.scrollTo({
			left: scrollAmount,
			behavior: "smooth", //set css
		});
	};

	const skItem = () => {
		return (
			<div className="skeletonItem">
				<div className="posterBlock skeleton"></div>
				<div className="textBlock">
					<div className="title skeleton"></div>
					<div className="date skeleton"></div>
				</div>
			</div>
		);
	};
	return (
		<div className="carousel">
			<ContentWrapper>
				{/* navigation arrow left */}
				<BsFillArrowLeftCircleFill
					className="carouselLeftNav arrow"
					onClick={() => navigation("left")}
				/>
				{/* navigation arrow right */}
				<BsFillArrowRightCircleFill
					className="carouselRightNav arrow"
					onClick={() => navigation("right")}
				/>
				{!loading ? (
					<div className="carouselItems" ref={carouselContainer}>
						{/* loop over api elements  */}
						{data?.map((item) => {
							const posterUrl = item.poster_path //get image code
								? url.poster + item.poster_path
								: PosterFallback; //show photo not available
							return (
								<div
									key={item.id}
									className="carouselItem"
									//add event click on item film
									onClick={() =>
										navigate(
											`${item.media_type}/${item.id}`
										)
									}>
									<div className="posterBlock">
										{/* get image */}
										<Img src={posterUrl} />
										{/* get rating */}
										<CircleRating
											rating={item.vote_average.toFixed(
												1
											)}
										/>
										{/* get genres id  */
										/* slice để chỉ show tên 2 genres */}
										<Genres
											data={item.genre_ids.slice(0, 2)}
										/>
									</div>
									<div className="textBlock">
										<span className="title">
											{/* get name */}
											{item.title || item.name}
										</span>
										<span className="date">
											{/* get release date */}
											{`${dayjs(
												item.release_date
											).format("MMM-DD, YYYY")}`}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="loadingSkeleton">
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Carousel;
