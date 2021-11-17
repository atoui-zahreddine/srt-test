import * as z from 'zod';

import React from 'react';
import Form from '../components/Form';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { emailSchema } from '../../../src/schemas/SignUp';

function Email({ setEmail, nextStep, email }) {
  const onSubmit = (data) => {
    setEmail(data.email);
    nextStep();
  };

  return (
    <Form schema={emailSchema} onSubmit={onSubmit}>
      <TextField
        name='email'
        placeholder='Your Email ...'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border p-2 rounded ring ring-gray-200 outline-none'
      />
      <Button next className='px-4 py-2 rounded' />
    </Form>
  );
}

export default Email;
