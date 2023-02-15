export const fetchData = async (url) => {
  return fetch(url, {
    method: 'GET',
  }).then((response) => {
    return response.blob();
  });
};

export const saveFile = (name, buffers, mime = 'application/octet-stream') => {
  const blob = new Blob(buffers, { type: mime });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = name;
  a.href = blobUrl;
  a.click();
  URL.revokeObjectURL(blob);
};
