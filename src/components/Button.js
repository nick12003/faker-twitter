import classNames from 'classnames';

const buttonType = {
  primary: 'text-white dark:text-white bg-primary',
  second: 'text-white dark:text-black bg-black dark:bg-white',
  outline: 'text-black bg-white border-2 border-color',
};

const Button = ({ label, type, fullWidth, onClick, large, disabled, className }) => {
  const typeStyled = buttonType[type] ?? buttonType.second;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        `disabled:opacity-70 disabled:cursor-not-allowed
        rounded-full font-semibold hover:opacity-80 transition
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${large ? 'px-5 py-3 text-xl' : 'px-4 py-2 text-md'}
      `,
        typeStyled,
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
