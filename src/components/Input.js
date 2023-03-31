import classNames from 'classnames';

const Input = ({
  placeholder,
  value,
  type = 'text',
  onChange,
  disabled,
  error,
  label,
  onKeyDown,
}) => {
  return (
    <div className="w-full">
      {label && <p className="text-xl font-semibold mb-2">{label}</p>}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className={classNames(
          'w-full p-4 text-lg  border-2 rounded-md outline-none focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed',
          { 'focus:border-red-500 border-red-500': error },
          { 'focus:border-sky-500 border-color': !error }
        )}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;
