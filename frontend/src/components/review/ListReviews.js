import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';

const ListReviews = ({ reviews }) => {
    return (
        // <div class="reviews w-75">
        //     <h3>Other's Reviews:</h3>
        //     <hr />
        //     {reviews && reviews.map(review => (
        //         <div key={review._id} class="review-card my-3">
        //             <div class="rating-outer">
        //                 <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
        //             </div>
        //             <p class="review_user">by {review.name}</p>
        //             <p class="review_comment">{review.comment}</p>

        //             <hr />
        //         </div>
        //     ))}
        // </div>

        <ul className="aa-review-nav">
            {reviews && reviews.map(review => (
                <li>
                <div className="media">
                    
                    <div className="media-body">
                        <img src={review.urlAvatar} width="30px"></img>
                        <h4 className="media-heading"><strong>{review.name}</strong></h4>
                        <div class="rating-outer">
                            <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                        <span className="reviewCreateAt"><Moment format="hh:mm:ss - DD/MM/YYYY">{review.createdAt}</Moment></span>
                        <br></br>
                        
                        <p>{review.comment}</p>
                    </div>
                </div>
                </li>
            ))}
            
            
            
        </ul>
    )
}

export default ListReviews