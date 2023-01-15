export const action = async ({ params }) => {
  const username = params.username;
  const sort = params.sort;
  const response = await fetch(
    `https://api.github.com/users/${username}/repos/sort=${sort}`
  );
  const profileInfo = await response.json();
  return profileInfo;
};
