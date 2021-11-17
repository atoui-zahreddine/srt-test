import React from 'react';
import Form from '../components/Form';
import RadioBox from '../components/RadioBox';
import Button from '../components/Button';

import { userTypeSchema } from '../../../src/schemas/SignUp';

function UserType({ setUserType, userType, prevStep, nextStep }) {
  const onSubmit = (data) => {
    setUserType(data.userType);
    nextStep();
  };

  return (
    <Form schema={userTypeSchema} onSubmit={onSubmit}>
      <RadioBox
        name='userType'
        value='client'
        userType={userType}
        onChange={(e) => setUserType(e.target.value)}
      />
      <RadioBox
        name='userType'
        value='therapist'
        userType={userType}
        onChange={(e) => setUserType(e.target.value)}
      />
      <Button className='px-4 py-2 rounded mr-2' onClick={prevStep} />
      <Button next className='px-4 py-2 rounded' />
    </Form>
  );
}

export default UserType;
