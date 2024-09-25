import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import base_Url from "../API/api";

axios.defaults.withCredentials = true;

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const userData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${base_Url}/api/users/profile/${username}`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    userData();
  }, [username]);
  return { user, loading };
};

export default useGetUserProfile;
