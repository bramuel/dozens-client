import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { XIcon } from "@heroicons/react/outline";

const portal = document.getElementById("portal");

const Background = styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const ModalHeader = styled.div`
`;

const ModalComponent = ({ isOpen, close, children }) => {
  const contentRef = useRef();
  useEffect(() => {
    if (!isOpen) return;
    function listener(e) {
      if (contentRef.current.contains(e.target)) return;
      close();
    }
    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [isOpen,close]);
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Background>
      <Content className="shadow-xl" ref={contentRef}>
        <ModalHeader className="flex flex-row justify-end" >
          <XIcon className="h-5" onClick={close} />
        </ModalHeader>
        {children}
      </Content>
    </Background>,
    portal
  );
};

export default ModalComponent;
