import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifySignin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninVerificationScreen(props) {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const userSigninVerification = useSelector(
    (state) => state.userSigninVerification
  );
  const { loading, error, userInfo } = userSigninVerification;
  const [signinCode, setSigninCode] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch forget password
    dispatch(verifySignin({ userId, signinCode }));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Signin</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="email">Signin Code</label>
          <input
            type="signinCode"
            id="signinCode"
            placeholder="Enter signin code"
            required
            onChange={(e) => setSigninCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Signin
          </button>
        </div>
      </form>
    </div>
  );
}
