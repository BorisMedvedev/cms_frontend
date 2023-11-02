export const goodsApi = async () => {
  try {
    const response = await fetch('https://first-ionized-tarascosaurus.glitch.me/api/goods', {
      method: 'GET',
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};


export const createClient = async (client, method, id = null) => {
  try {
    const response = await fetch(`https://first-ionized-tarascosaurus.glitch.me/api/goods/${method === 'POST' ? '' : id}`, {
      method,
      body: JSON.stringify(client),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};


export const deleteClientItem = async (id) => {
  await fetch(`https://first-ionized-tarascosaurus.glitch.me/api/goods/${id}`, {
    method: 'DELETE',
  });
};


