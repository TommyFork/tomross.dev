"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import ContactModal from "./ContactModal";

type ContactModalContextValue = {
  open: boolean;
  openModal: (options?: ModalTriggerOptions) => void;
  closeModal: () => void;
  toggleModal: (options?: ModalTriggerOptions) => void;
};

type AnchorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ModalTriggerOptions = {
  triggerRect?: DOMRect | null;
  trigger?: HTMLElement | null;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const [lastTrigger, setLastTrigger] = useState<HTMLElement | null>(null);
  const clearAnchorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setAnchorFromRect = useCallback((rect: DOMRect | null | undefined) => {
    if (!rect) {
      setAnchorRect(null);
      return;
    }

    const { left, top, width, height } = rect;
    setAnchorRect({ left, top, width, height });
  }, []);

  const openModal = useCallback((options?: ModalTriggerOptions) => {
    if (clearAnchorTimeoutRef.current) {
      clearTimeout(clearAnchorTimeoutRef.current);
      clearAnchorTimeoutRef.current = null;
    }

    if (options?.triggerRect) {
      setAnchorFromRect(options.triggerRect);
    }

    if (options?.trigger) {
      setLastTrigger(options.trigger);
    }

    setOpen(true);
  }, [setAnchorFromRect]);

  const closeModal = useCallback(() => {
    setOpen(false);

    if (clearAnchorTimeoutRef.current) {
      clearTimeout(clearAnchorTimeoutRef.current);
    }

    clearAnchorTimeoutRef.current = setTimeout(() => {
      setAnchorRect(null);
      clearAnchorTimeoutRef.current = null;
    }, 600);
  }, []);

  const toggleModal = useCallback(
    (options?: ModalTriggerOptions) => {
      setOpen((prev) => {
        const next = !prev;

        if (next) {
          if (clearAnchorTimeoutRef.current) {
            clearTimeout(clearAnchorTimeoutRef.current);
            clearAnchorTimeoutRef.current = null;
          }

          if (options?.triggerRect) {
            setAnchorFromRect(options.triggerRect);
          }

          if (options?.trigger) {
            setLastTrigger(options.trigger);
          }
        }

        return next;
      });
    },
    [setAnchorFromRect],
  );

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

  useEffect(() => {
    if (open || !lastTrigger) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (document.contains(lastTrigger)) {
        lastTrigger.focus({ preventScroll: true });
      }
      setLastTrigger(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, lastTrigger]);

  useEffect(
    () => () => {
      if (clearAnchorTimeoutRef.current) {
        clearTimeout(clearAnchorTimeoutRef.current);
      }
    },
    [],
  );

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
      <ContactModal
        open={open}
        onClose={closeModal}
        anchorRect={anchorRect}
        onExited={() => {
          setAnchorRect(null);
          if (clearAnchorTimeoutRef.current) {
            clearTimeout(clearAnchorTimeoutRef.current);
            clearAnchorTimeoutRef.current = null;
          }
        }}
      />
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
