// 작업중
export const getUsers = async () => {
  const res = await fetch('/api/users');
  if (!res.ok) {
  }

  const data = await res.json();
  return data;
};
