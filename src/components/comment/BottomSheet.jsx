// components/BottomSheet.js

import React, { useState, useEffect } from 'react';
import './bottmSheet.css'; // Style this as per your needs
import { connect } from 'react-redux';
import { Avatar, Typography } from '@mui/material';
import { fetchComments, createComment } from '../../actions/CommentAction';

const BottomSheet = ({ isOpen, onClose, comments, loading, error, fetchComments, createComment }) => {
  const [comment, setComment] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    fetchComments(); // Fetch comments on component mount
  }, [fetchComments]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      return; // Prevent submitting empty comments
    }

    // Dispatch createComment action with comment data
    createComment({ text: comment, postId: 'postId_here' }); // Replace postId_here with actual post ID

    setComment('');
  };

  const handleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>; // Replace with your loading indicator component
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>; // Replace with your error handling component
  }

  // Render comments
  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
      <div className="bottom-sheet-content">
        <Typography
          id="modal-modal-title"
          variant="h6"
          className="text-white"
          component="h2"
        >
          Comments
        </Typography>
        {/* Display fetched comments */}
        <div className="comment-container">
  {comments.map((comment, index) => (
    <div key={index} className="comment">
      <Avatar
        src="https://i.imgur.com/6F5Z342.png"
        alt="Profile"
        className="profile-picture border-teal-50 border-2"
      />
      <div className="comment-content">
        <Typography variant="subtitle2" className="text-white gap-x-4">
          {comment.author} <span>{comment.time}</span>
        </Typography>
        <Typography variant="body2" className="text-white">
          {comment.text}
        </Typography>
        <div className="like-count">
          <Typography variant="caption" className="text-white">
            {comment.likes} likes
          </Typography>
        </div>
      </div>
    </div>
  ))}
</div>

        
        {/* Input for new comment */}
        <div className='mt-8'>
          <button className="input-toggle mt-6" onClick={handleInputVisibility}>
            {isInputVisible ? 'Hide' : 'Add Comment'}
          </button>
          {isInputVisible && (
            <form onSubmit={handleCommentSubmit}>
              <div className="comment-input">
                <img
                  src="https://i.imgur.com/6F5Z342.png" // Replace with your profile image URL
                  alt="Profile"
                  className="profile-picture"
                />
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <button className="close-button p-1 rounded-lg mr-3 hover:bg-[#333333]" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loading: state.comments.loading,
  error: state.comments.error,
});

export default connect(mapStateToProps, { fetchComments, createComment })(BottomSheet);
