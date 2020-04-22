import React, { useState } from "react";

export interface Options {
  title: string;
  message: string;
  buttonText: string;
  action: () => void;
  score: number;
}

type ModalContextType = {
  isModalShown: boolean;
  options: Options;
  showModal: (options: Options) => void;
  hideModal: () => void;
};

export const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

interface ModalProviderProps {}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [options, setOptions] = useState<Options>({
    title: "",
    message: "",
    buttonText: "",
    score: 0,
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
