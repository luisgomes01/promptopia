import { useState, useEffect } from "react";

interface IUseLoginReturn {
  isLoggedIn: boolean;
}

export const useLogin = (initialState = true) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState);

  useEffect(() => {
    // TODO implement setIsLoggedIn code
  }, []);

  return { isLoggedIn };
};
