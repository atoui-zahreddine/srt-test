import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';

function Form({ schema, onSubmit, children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
      {children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, { register, errors })
        )}
    </form>
  );
}

export default Form;
