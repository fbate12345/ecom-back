import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ResetPasswordScreen(props) {
  const dispatch = useDispatch();
  const resetToken = props.match.params.id;
  const userRequestResetPassword = {};
  const { loading, error } = userRequestResetPassword;

  const userResetPassword = {};
  const {
    loading: loadingReset,
    error: errorReset,
    succes: successReset,
  } = userResetPassword;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch forget password
    if (password !== confirmPassword) {
      window.alert('Passwords are not matched');
    } else {
      dispatch(resetPassword({ password, resetToken }));
    }
  };
  useEffect(() => {
    dispatch(requestResetPassword(resetToken));
  }, []);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Reset Password</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Reset Password
              </button>
            </div>
            <div>
              {loadingReset && <LoadingBox></LoadingBox>}
              {errorReset && (
                <MessageBox variant="danger">{errorReset}</MessageBox>
              )}
              {successReset && (
                <MessageBox variant="success">
                  You have reset your password successfully. Please signin
                </MessageBox>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
