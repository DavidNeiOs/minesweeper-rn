import React, { useState } from "react";

export interface Options {
  title: string;
  message: string;
  buttonText: string;
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
    buttonText: "",
    action: () => {},
  },
  showModal: () => {},
  hideModal: () => {},
});

interface ModalProviderProps {}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [options, setOptions] = useState<Options>({
    title: "",
    message: "",
    buttonText: "",
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
