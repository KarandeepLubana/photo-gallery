import React, { useState } from "react";
import Title from "./Title";
import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router";

const Main = () => {
  const user = useAuth().user;
  const [selectedImg, setSelectedImg] = useState(null);

  if (!user || user === null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
};

export default Main;
