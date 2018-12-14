import React from "react";

const Widget = ({ children, error = false, loading = false }) => {
  if (loading) {
    return <div className="Loading">Loading...</div>;
  }

  if (error) {
    return <div className="Error">{error}</div>;
  }

  return <div className="Widget">{children}</div>;
};

export default Widget;
