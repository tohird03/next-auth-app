import { useState } from 'react';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  modalTitle: string,
  okText?: string,
  closeText?: string,
  children: React.ReactNode,
  modalWidth?: number
}

// Modal component
export default function Modal({ isOpen, onClose, modalTitle, okText, closeText, children }: Props) {
  if (!isOpen) return null;

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative p-4 sm:w-[300px] lg:w-[450px]">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{modalTitle}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
