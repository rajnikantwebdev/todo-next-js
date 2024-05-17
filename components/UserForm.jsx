"use client";

import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const authenticationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password must be at least\nof 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const UserFormAuthentication = () => (
  <div className="bg-secondColor shadow-md px-12 py-8 h-screen flex items-start flex-col justify-center">
    <div className="mb-4">
      <h1 className="text-5xl font-bold">Next-todo</h1>
      <h4 className="text-sm">Add your daily task</h4>
    </div>
    <div className="mb-12">
      <h2 className="text-3xl">Authenticate yourself!</h2>
    </div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={authenticationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="my-6">
            <button className="w-full max-w-xs font-bold shadow-sm py-3 px-3 bg-thirdColor text-white flex items-center justify-center duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
              <div className="bg-white p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span className="ml-4">Sign Up with Google</span>
            </button>
          </div>
          <div className="mb-4">
            <span className="text-sm">or use email and password</span>
          </div>
          <div className="flex flex-col mb-4">
            <span>Email</span>

            <Field
              type="email"
              name="email"
              placeholder="Email"
              values={values.email}
              onBlur={handleBlur}
              className="px-4 py-2 text-black"
            />
            <ErrorMessage
              component={"div"}
              className="text-sm text-red-600 whitespace-pre-wrap"
              name="email"
            />
          </div>
          <div className="flex flex-col">
            <span>Password</span>
            <Field
              type="password"
              name="password"
              placeholder="Enter a valid password"
              values={values.password}
              onBlur={handleBlur}
              className="px-4 py-2 text-black"
            />
            <ErrorMessage
              component={"div"}
              className="text-sm text-red-600 whitespace-pre-wrap *:"
              name="password"
            />
          </div>
          <button
            className={`${
              isSubmitting && "cursor-not-allowed"
            } bg-thirdColor px-2 py-1 mt-4 text-white font-bold`}
            type="submit"
            disabled={isSubmitting}
          >
            Authenticate
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default UserFormAuthentication;
