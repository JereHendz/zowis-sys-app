import { React, useEffect } from "react";
import axios from "axios";

export default function Roles() {
  useEffect(() => {
    axios
      .get("https://zowis.devsoftjson.com/zowis-system-new/api/roles")
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
