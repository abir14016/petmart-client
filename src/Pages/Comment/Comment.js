import React from 'react';

const Comment = ({ comment }) => {
    const { commenterName, comment: currentComment, commenterImage } = comment
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar tooltip" data-tip={commenterName}>
                <div className="w-10 rounded-full">
                    <img src={commenterImage} alt='commenterImage' />
                </div>
            </div>
            <div className="chat-bubble">{currentComment}</div>
        </div>
    )
};

export default Comment;