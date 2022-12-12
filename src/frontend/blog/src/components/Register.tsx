import { useFormik } from 'formik';
import React from 'react'



const Register = () => {
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          name: '',
          surname: '',
          email: '',
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
          
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
    
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            name="surname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.surname}
          />
    
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
    
          <button type="submit">Submit</button>
        </form>
      );
}

export default Register