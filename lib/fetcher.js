
// const fetcher = async (path, method = 'GET', body) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin${path}`, {
//     method,
//     credentials: 'include',
//     body: body ? JSON.stringify(body) : null,
//     // cache: 'no-store',
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || 'Failed to fetch');
//   }

//   return data;
// };


const fetcher = async (path, method = 'GET', body) => {
    const options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
  };
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
}

const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin${path}`, options);
  const data = await res.json();

  if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch');
    }

    return data;
};

export default fetcher;