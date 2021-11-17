import React, { useState } from 'react';
import { Email, Password, UserType, FinalStep } from './Steps';

function MultistepForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const nextStep = () => {
    setStep((step) => (step < 4 ? step + 1 : 3));
  };
  const prevStep = () => {
    setStep((step) => (step > 1 ? step - 1 : 1));
  };

  switch (step) {
    case 1:
      return <Email setEmail={setEmail} nextStep={nextStep} email={email} />;
    case 2:
      return (
        <Password
          setPassword={setPassword}
          prevStep={prevStep}
          nextStep={nextStep}
          password={password}
        />
      );
    case 3:
      return (
        <UserType
          setUserType={setUserType}
          prevStep={prevStep}
          nextStep={nextStep}
          userType={userType}
        />
      );
    default:
      return (
        <FinalStep email={email} password={password} userType={userType} />
      );
  }
}

export default MultistepForm;
