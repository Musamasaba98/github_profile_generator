import React from "react";

function Pie({ loader }) {
  return <div>Pie</div>;
}

export const loader = async ({ params }) => {
  const username = params.username;
  const sort = params.sort;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos/sort=${sort}`
  );
  const profileInfo = await response.json();
  return profileInfo;
};

export default Pie;
