import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth';
import {
  Form,
  Button,
  Alert
} from 'react-bootstrap';


const LoginForm = () => {

  // ----------------- Set State Variables ---------------

  // set initial FORM state
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  // set state for Form VALIDATION
  const [validated] = useState(false);

  // set state for ALERT
  const [showAlert, setShowAlert] = useState(false);

  // bring in loginUser from mutations
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false)
    }
  }, [error]);

  // Funtion to update State ---  User Form Data --------
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Function for FORM SUBMIT ----------------------------
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userData }
      });

      Auth.login(data.loginUser.token);

      console.log(data.user._id);
      console.log(data); //log data to ensure right token

    } catch (error) {
      console.error(error);
    }

    // reset form to blank
    setUserData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.email && userData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
