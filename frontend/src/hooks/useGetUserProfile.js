import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const userData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/users/profile/${username}`);
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
