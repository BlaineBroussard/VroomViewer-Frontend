import api from "../api/api";

const getLocalValues = async () => {
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  let token = localToken ? localToken : sessionToken ? sessionToken : undefined;
  if (token) {
    const returnResponse = await api("/login/tokenCheck", "Post", token, {});
    if (returnResponse.success) {
      return token;
    }
  } else {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    return token;
  }
};

export default getLocalValues;
