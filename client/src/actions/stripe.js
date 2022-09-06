import axios from "axios";
export const getSessionId = async (token, hotelId) => {
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    {
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
