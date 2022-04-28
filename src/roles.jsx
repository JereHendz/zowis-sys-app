import { React, useEffect } from "react";
import axios from "axios";

export default function Roles() {
  useEffect(() => {
    axios
      .get("https://ec2-18-117-137-48.us-east-2.compute.amazonaws.com/zowis-system-new/api/roles")
      .then((payload) => {
        console.log(payload);
        // setNotes(payload.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Prueba react</h1>
    </div>
  );
}
