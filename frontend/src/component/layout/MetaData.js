import React from "react";
import Helmet from "react-helmet";
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;

//title pass to the another page
//take title and store it in this page
//using helmet we show title in every page
//prottek ta page aa home page er pase title set kore dayy
