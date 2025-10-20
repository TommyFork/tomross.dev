"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import ContactModal from "./ContactModal";

type ContactModalContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggleModal = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, closeModal]);

  const value = useMemo(
    () => ({
      open,
      openModal,
      closeModal,
      toggleModal,
    }),
    [open, openModal, closeModal, toggleModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }

  return context;
}
