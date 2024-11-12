import { useState } from 'react';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  modalTitle: string,
  okText?: string,
  closeText?: string,
  children: React.ReactNode,
}

// Modal component
export default function Modal({ isOpen, onClose, modalTitle, okText, closeText, children }: Props) {
  if (!isOpen) return null;

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl p-4">
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
          {/* <div className="flex items-center p-4 border-t dark:border-gray-600">
            <button onClick={onClose} className="text-white bg-blue-700 rounded-lg px-5 py-2.5">{okText || "Ok"}</button>
            <button onClick={onClose} className="text-gray-900 bg-white rounded-lg px-5 py-2.5 border">{closeText || 'Cancel'}</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
