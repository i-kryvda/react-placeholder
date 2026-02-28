export type ModalType = {
  id: string;
  render: (id: string) => React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  contentRef?: React.RefObject<HTMLDivElement>;
};

export type OpenModalOptions = {
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
};

export type ModalContextType = {
  openModal: (
    render: (id: string) => React.ReactNode,
    options?: OpenModalOptions,
  ) => string;
  closeModal: (id: string) => void;
  closeTopModal: () => void;
};
