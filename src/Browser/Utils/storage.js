const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getStorage = (key, fallback = undefined) => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
}

export {
  saveStorage,
  getStorage,
}