"use client";

import React, { useContext } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/utils/userContext";
import axios from "axios";
import { userSignup, userLogin } from "@/app/login/action";

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

  // const signUpUser = async (email, password) => {
  //   try {
  //     let { data, error } = await supabase.auth.signUp({
  //       email: email,
  //       password: password,
  //     });

  //     if (error) {
  //       console.log("error while registering, ", error);
  //       throw error;
  //     }
  //     console.log("data: ", data);
  //     setUser(data?.user);
  //     redirect.push("/");
  //   } catch (error) {
  //     console.log("register error: ", error);
  //   }
  // };

  // const loginUser = async (email, password) => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/login", {
  //       email,
  //       password,
  //     });
  //     if (response) {
  //       redirect.push("/");
  //     }
  //   } catch (error) {
  //     console.log("while logging: ", error);
  //   }
  // };

  return (
    <div className="bg-secondColor shadow-md px-12 py-8 h-screen flex items-start flex-col justify-center">
      <div className="mb-4">
        <h1 className="text-5xl font-bold text-thirdColor">B-Next</h1>
        <h4 className="text-sm text-purple-300">
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
            <h2 className="text-3xl text-thirdColor">Register yourself!</h2>
          </div>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-white">
                  Email:
                </label>
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Password:
                </label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-thirdColor text-white px-4 py-1"
              formAction={userSignup}
            >
              Register
            </button>
          </form>
        </>
      ) : pathName === "/login" ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl  text-thirdColor">Login Yourself!</h2>
          </div>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-white">
                  Email:
                </label>
                <br />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Password:
                </label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  className="px-2 py-1 bg-mainColor focus:border-b-2 focus:outline-none text-white"
                />
              </div>
            </div>
            <button
              className="mt-4 bg-thirdColor text-white px-4 py-1"
              formAction={userLogin}
            >
              Log in
            </button>
          </form>
        </>
      ) : (
        <div>Invalid path</div>
      )}
    </div>
  );
};

export default UserFormAuthentication;
