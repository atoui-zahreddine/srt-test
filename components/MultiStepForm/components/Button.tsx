function Button({ next, className, register, ...rest }) {
  return (
    <input
      type={next ? 'submit' : 'button'}
      value={next ? 'Next' : 'Prev'}
      className={className}
      {...rest}
    />
  );
}

export default Button;
