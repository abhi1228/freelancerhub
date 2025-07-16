import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {

  const { isLoading, error, data } = useQuery({
        queryKey: [`${review.userId}`],
        queryFn: () =>
          newRequest.get(`/users/${review.userId}`).then((res) => {
            return res.data;
          }),
      });
     // console.log("review-users",data)

  return (
    <div className="item">
      {isLoading? "Loading.." : error ? "Something went wrong in user" : 
      <div className="user">
        <img
          className="pp"
          src={data.img ? data.img : '/img/noavatar.jpg' }
          alt=""
        />
        <div className="info">
          <span>{data.username}</span>
          <div className="country">
            <img
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
              alt=""
            />
            <span>{data?.country}</span>
          </div>
        </div>
      </div>
    }
      
      <div className="stars">
        {review.star && Array(review.star)
          .fill()
          .map((star, index) => (
            <img key={index} src="/img/star.png" alt="" />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
