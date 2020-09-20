import { time } from 'console';
import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      key={message.id}
      hasDescription={!!message.description}
      type={message.type}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        <p>{message.description && message.description}</p>

        <button type="button" onClick={() => removeToast(message.id)}>
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
