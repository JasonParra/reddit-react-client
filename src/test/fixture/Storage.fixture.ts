export const mockLocalStorage = () => {
  const localStorageMock = {
    ...global.localStorage,
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;
};

export const unMockLocalStorage = () => {
  const globalAsAny = global as any;
  if (globalAsAny.localStorage.getItem.mockclear) {
    globalAsAny.localStorage.getItem.mockClear();
  }
  if (globalAsAny.localStorage.setItem.mockclear) {
    globalAsAny.localStorage.setItem.mockClear();
  }

  delete globalAsAny.localStorage;
};
