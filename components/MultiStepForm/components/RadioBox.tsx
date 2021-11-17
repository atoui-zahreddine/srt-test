import React from 'react';

function RadioBox({ register, errors, name, onChange, ...rest }) {
  return (
    <div class='mt-2'>
      <div>
        <label class='inline-flex items-center'>
          <input
            {...register(name, { onChange: onChange })}
            type='radio'
            class='form-radio'
            {...rest}
          />
          <span class='ml-2'>{rest.value}</span>
        </label>
        <p className='text-red-400'>{errors[name]?.message}</p>
      </div>
    </div>
  );
}

export default RadioBox;
