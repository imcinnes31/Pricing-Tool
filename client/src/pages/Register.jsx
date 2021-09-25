import React from "react";
import Axios from "axios";

export default function Register() {
  const counselor_data = {
    id: "3cfacbf3-5ba4-4827-8577-235aa3fa1aa8",
    name: "Chelsey Dietrich",
    gender: "male",
    title: "laudantium voluptate suscipit sunt enim enim",
    age: 98,
    ethnicity: ["hawaiian"],
    issues: ["adoption"],
    insurance: ["ceridian"],
    therapy_type: ["cognitive_behavioural"],
    credentials: ["a"],
    description:
      "ut libero sit aut totam inventore sunt\nporro sint qui sunt molestiae\nconsequatur cupiditate qui iste ducimus adipisci\ndolor enim assumenda soluta laboriosam amet iste delectus hic",
    price: 219,
    pfp: "https://picsum.photos/360/240?random=0",
    pronouns: "She/Her/her's",
    date: "2021-05-31T12:04:39.572Z",
  };
  const postTest = () => {
    Axios.post("/api/insertCounselor", counselor_data);
  };
  return (
    <div>
      <button onClick={postTest}>Try Me</button>
    </div>
  );
}
