import { myAxios } from "./helper";
/* NGO SIGNUP AND LOGIN*/
export const signup = (user) => {
  return myAxios
    .post("http://localhost:8000/accounts/api/register-organization/", user)
    .then((response) => response.data);
};

export const login = (user) => {
  return myAxios
    .post("http://localhost:8000/accounts/api/login-organization/", user)
    .then((response) => response.data);
};

/* USER SIGNUP AND LOGIN */
export const userLogin = (user) => {
  return myAxios
    .post("http://localhost:8000/accounts/api/login/", user)
    .then((response) => response.data);
};

export const userSignup = (user) => {
  return myAxios
    .post("http://localhost:8000/accounts/api/register-user/", user)
    .then((response) => response.data);
};

/* VERIFICATION */
export const isVerified = (email) => {
  return myAxios.get("http://localhost:8000/accounts/api/check-user-active/", {
    params: { email },
  });
};

/* Events */
export const getEvents = (event) => {
  return myAxios.get("http://localhost:8000/org/events/", event);
};

export const postEvent = (event, token) => {
  return myAxios
    .post("http://localhost:8000/org/events/", event, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data);
};

export const postFoodRequest = (event, token) => {
  return myAxios
    .post("http://localhost:8000/accounts/api/food-donations/", event, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data);
};

/* Volunteer*/

export const volunteerForEvent = (id, token) => {
  return myAxios
    .post(
      `http://localhost:8000/org/api/events/volunteer/?event_id=${id}`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => response.data);
};

/* File Handling */
export const submitLicense = (fileData, id) => {
  const formData = new FormData();
  formData.append("license", fileData);
  return myAxios
    .post(
      `http://localhost:8000/accounts/api/upload-license/${id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => response.data);
};

/* Rating an NGO */
export const ratingFn = (rating, description, id, token) => {
  // Make sure to return the axios.post call directly
  return myAxios
    .post(
      `http://127.0.0.1:8000/accounts/api/rateOrg/${id}/`,
      {
        rating: rating,
        description: description,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => response.data);
};

/* GET RATING BY ORG NAME*/

export const getRatingsByOrganization = (organizationName) => {
  return myAxios.get("http://localhost:8000/accounts/api/ratings/org/", {
    params: { organization_name: organizationName },
  });
};
