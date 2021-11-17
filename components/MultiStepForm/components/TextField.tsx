function TextField({
  register, errors, name, placeholder, onChange, value, ...rest
}) {
  return (
    <>
      <input
        {...register(name, { onChange: onChange })}
        value={value}
        placeholder={placeholder}
        {...rest} />
      <p className='text-red-400'>{errors[name]?.message}</p>
    </>
  );
}

export default TextField;
