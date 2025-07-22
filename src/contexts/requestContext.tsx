import React, { createContext, useState, useContext } from 'react';
import type { PagedRequestType } from '../types/PagedRequestType';

type RequestUpdateAction =
  | Partial<PagedRequestType>
  | ((prev: PagedRequestType) => Partial<PagedRequestType>);

interface RequestContextType {
  request: PagedRequestType;
  updateRequest: (action: RequestUpdateAction) => void;
  resetRequestToDefaults: () => void;
}

const defaultRequest: PagedRequestType = {
  pageIndex: 1,
  pageSize: Number(localStorage.getItem('booksPerPage')) || 8,
  columnNameForSorting: 'Title',
  sortDirection: 'asc',
  searchValue: '',
  searchBy: 'Title',
};

export const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRequest, setCurrentRequest] = useState<PagedRequestType>(defaultRequest);

  const updateRequest = (action: RequestUpdateAction) => {
    if (typeof action === 'function') {
      setCurrentRequest(prev => ({
        ...prev,
        ...(action as (prev: PagedRequestType) => Partial<PagedRequestType>)(prev),
      }));
    } else {
      setCurrentRequest(prev => ({
        ...prev,
        ...action,
      }));
    }
  };

  const resetRequestToDefaults = () => {
    setCurrentRequest(defaultRequest);
  };

  return (
    <RequestContext.Provider
      value={{ request: currentRequest, updateRequest, resetRequestToDefaults }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
};
