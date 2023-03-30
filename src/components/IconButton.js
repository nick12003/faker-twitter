import classNames from 'classnames';

const IconButton = ({ children, className, ...reset }) => {
  return (
    <button className={classNames('p-2 text-3xl rounded-[50%] item-hover', className)} {...reset}>
      {children}
    </button>
  );
};

export default IconButton;
