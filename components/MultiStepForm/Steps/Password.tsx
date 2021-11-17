import React from 'react';
import Form from '../components/Form';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { passwordSchema } from '../../../src/schemas/SignUp';

function Password({ setPassword, nextStep, prevStep, password }) {
  const onSubmit = (data) => {
    setPassword(data.password);
    nextStep();
  };

  return (
    <Form schema={passwordSchema} onSubmit={onSubmit}>
      <TextField
        name='password'
        placeholder='Your Password...'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        className='border p-2 rounded ring ring-gray-200 outline-none'
      />
      <Button className='px-4 py-2 rounded mr-2' onClick={prevStep} />
      <Button next className='px-4 py-2 rounded' />
    </Form>
  );
}

export default Password;
