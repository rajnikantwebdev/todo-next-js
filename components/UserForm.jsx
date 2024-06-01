"use client";

import React, { useContext } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/utils/userContext";

const authenticationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password must be at least\nof 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const UserFormAuthentication = () => {
  const redirect = useRouter();
  const { setUser } = useContext(UserContext);
  const pathName = usePathname();

  const signUpUser = async (email, password) => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log("error while registering, ", error);
        throw error;
      }
      console.log("data: ", data);
      setUser(data?.user);
      redirect.push("/");
    } catch (error) {
      console.log("register error: ", error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
      console.log("login data: ", data);
      setUser(data?.user);
      redirect.push("/");
    } catch (error) {
      console.log("error while logging ", error);
    }
  };

  return (
    <div className="bg-secondColor shadow-md px-12 py-8 h-screen flex items-start flex-col justify-center">
      <div className="mb-4">
        <h1 className="text-5xl font-bold">B-Next</h1>
        <h4 className="text-sm">
          Create Blog whenever
          <br />
          you want, how
          <br />
          however you want!
        </h4>
      </div>
      {pathName === "/register" ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl">Register yourself!</h2>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={authenticationSchema}
            onSubmit={(values, { setSubmitting }) => {
              signUpUser(values.email, values.password);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="whitespace-pre-wrap">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="px-2 py-1 focus:outline-none"
                    />
                    <br />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <div className="whitespace-pre-wrap">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="px-2 py-1 focus:outline-none"
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <button
                    className="bg-mainColor text-secondColor px-2 py-1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering" : "Register"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : pathName === "/login" ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl">Login Yourself!</h2>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={authenticationSchema}
            onSubmit={(values, { setSubmitting }) => {
              loginUser(values.email, values.password);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="whitespace-pre-wrap">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="px-2 py-1 focus:outline-none"
                    />
                    <br />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <div className="whitespace-pre-wrap">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="px-2 py-1 focus:outline-none"
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 text-sm"
                    />
                  </div>
                  <button
                    className="bg-mainColor text-secondColor px-2 py-1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in" : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <div>Invalid path</div>
      )}
    </div>
  );
};

export default UserFormAuthentication;
