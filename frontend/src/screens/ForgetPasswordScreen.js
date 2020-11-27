import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ForgetPasswordScreen() {
  const dispatch = useDispatch();
  const userForgetPassword = useSelector((state) => state.userForgetPassword);
  const { loading, error, success } = userForgetPassword;
  const [email, setEmail] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch forget password
    dispatch(forgetPassword(email));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Forget Password</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">
            An email sent to you to reset your password
          </MessageBox>
        )}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Send Reset Password Email
          </button>
        </div>
      </form>
    </div>
  );
}
