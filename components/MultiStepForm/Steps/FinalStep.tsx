import React, { useEffect } from 'react';
import { useMutation } from 'urql';
import { SIGNUP_MUTATION } from '../../../src/mutations/user';

function FinalStep({ email, password, userType }) {
  const [result, createUser] = useMutation(SIGNUP_MUTATION);
  const { data, fetching, error } = result;
  const submitSubmission = () => {
    const input = { email, password, userType };
    createUser(input).then((res) => {});
  };
  useEffect(() => {
    submitSubmission();
  }, []);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{data.token}</pre>;
}

export default FinalStep;
