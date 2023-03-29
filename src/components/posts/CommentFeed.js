import CommentItem from './CommentItem';

const CommentFeed = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
