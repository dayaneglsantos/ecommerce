import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  layer?: number; // 👈 controla a pilha
}

export default function Modal({
  show,
  onClose,
  children,
  maxWidth = '2xl',
  layer = 0,
}: ModalProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }[maxWidth];

  const baseZ = 100; // início do z-index
  const overlayZ = baseZ + layer * 20; // cada layer aumenta o z-index em 20
  const contentZ = overlayZ + 10; // conteúdo fica acima do overlay

  return (
    <Dialog.Root open={show} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          style={{ zIndex: overlayZ }}
          className="fixed inset-0 bg-black/50"
        />

        {/* Conteúdo */}
        <Dialog.Content
          style={{ zIndex: contentZ }}
          className={`
            fixed left-1/2 top-1/2
            w-full ${maxWidthClass}
            -translate-x-1/2 -translate-y-1/2
            rounded-lg bg-white p-4 shadow-xl
            max-h-[90vh] overflow-y-auto
            focus:outline-none
          `}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
