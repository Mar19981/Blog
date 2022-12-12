import { useFormik } from 'formik';
import React from 'react'

const Login = () => {
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </form>
      );
}

export default Login