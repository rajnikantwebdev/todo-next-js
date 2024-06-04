"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import axios from "axios";

const BlogForm = () => {
  const initialValues = {
    title: "",
    author: "",
    description: "",
    img: null,
    video: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    description: Yup.string().required("Description is required"),
    img: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "The file is too large", (value) => {
        if (!value) return true; // skip validation if value is empty
        return value.size <= 10485760; // 10 MB
      }),
  });

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("uploading file...");
    try {
      const { title, author, description, img, video } = values;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("img", img);
      console.log("image :", img, title);
      if (video) {
        formData.append("video", video);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/upload`,
        formData
      );
      if (response) {
        resetForm();
      }
    } catch (error) {
      console.error("Error while adding blog", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event, setFieldValue, fieldName) => {
    console.log(event.currentTarget.files[0]);

    setFieldValue(fieldName, event.currentTarget.files[0], false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden justify-center items-center w-[40rem] px-6">
      <h1 className="text-start text-5xl text-white font-bold mb-12">
        CREATE BLOG!
      </h1>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleFormSubmit(values, { setSubmitting, resetForm });
          }}
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div>
                  <label htmlFor="title" className="text-white">
                    Title
                  </label>
                </div>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter a title"
                  className="px-2 py-1 focus:outline-none  bg-secondColor text-white focus:border-b-2 w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <div>
                <div>
                  <label className="text-white" htmlFor="description">
                    Description
                  </label>
                </div>
                <Field
                  name="description"
                  placeholder="Enter a description"
                  as="textarea"
                  className="px-2 py-1 focus:outline-none  bg-secondColor text-white focus:border-b-2  w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <div>
                <div>
                  {" "}
                  <label className="text-white" htmlFor="author">
                    Author
                  </label>
                </div>

                <Field
                  name="author"
                  type="text"
                  placeholder="Enter a author name"
                  className="px-2 py-1 focus:outline-none  bg-secondColor text-white focus:border-b-2 w-full"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <div>
                <div>
                  <label className="text-white" htmlFor="image">
                    Image
                  </label>
                </div>

                <input
                  name="img"
                  type="file"
                  className="text-white"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, setFieldValue, "img")
                  }
                />
                <ErrorMessage
                  name="img"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <div>
                <div>
                  <label className="text-white" htmlFor="video">
                    Video
                  </label>
                </div>

                <input
                  name="video"
                  className="text-white"
                  type="file"
                  accept="video/*"
                  onChange={(event) =>
                    handleFileChange(event, setFieldValue, "video")
                  }
                />
                <ErrorMessage
                  name="video"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>

              <div>
                {!isSubmitting ? (
                  <Button
                    className="bg-thirdColor font-bold text-white"
                    type="submit"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    className="bg-thirdColor font-bold text-white"
                    isLoading
                  >
                    Submitting...
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
