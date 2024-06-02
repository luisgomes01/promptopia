import { useState } from "react";

export const useToggler = (initialState = false) => {
  const [visible, setVisible] = useState(initialState);

  const toggle = () => setVisible((prev) => !prev);

  return { visible, toggle };
};
