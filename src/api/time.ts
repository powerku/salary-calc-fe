const getServerTime = async (url: string) => {
  const queryString = new URLSearchParams({ url }).toString();
  const res = await fetch(`/api/serverTime?${queryString}`, {
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export { getServerTime };
