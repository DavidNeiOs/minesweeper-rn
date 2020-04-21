import React, { useState } from "react";

interface Options {
  title: string;
  message: string;
  action: () => void;
}

export const ModalContext = React.createContext<{
  isModalShown: boolean;
  options: Options;
  showModal: (options: Options) => void;
  hideModal: () => void;
}>({
  isModalShown: false,
  options: {
    title: "",
    message: "",
    action: () => {},
  },
  showModal: () => {},
  hideModal: () => {},
});

interface ModalProviderProps {}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [options, setOptions] = useState({
    title: "",
    message: "",
    action: () => {},
  });

  return (
    <ModalContext.Provider
      value={{
        isModalShown,
        options,
        showModal: (options: Options) => {
          setIsModalShown(true);
          setOptions(options);
        },
        hideModal: () => {
          setIsModalShown(false);
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
