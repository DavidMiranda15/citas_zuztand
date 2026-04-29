import { type MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.dialog`
  width: 90%;
  max-width: 450px;
  border-radius: 12px;
  border: none;
  padding: 24px;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  font-family: inherit;

  ::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }

  h3 {
    margin-top: 0;
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 800;
    border-bottom: 2px solid #f3f4f6;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const ButtonCancel = styled.button`
  padding: 10px 20px;
  background-color: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;

const ButtonDelete = styled.button`
  padding: 10px 20px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #b91c1c;
  }
`;

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); 
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <Container
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3>{title}</h3>

      
      <div style={{ color: '#4b5563', lineHeight: '1.5' }}>
        {children}
      </div>

      <Buttons>
        <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
        <ButtonDelete onClick={proceedAndClose}>Sí, Eliminar</ButtonDelete>
      </Buttons>
    </Container>
  );
};

export default DialogModal;