export const mockAddToCartService = (product: { id: number; name: string; price: number }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });

export const mockRemoveFromCartService = (id: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(id);
    }, 500);
  });

export const fetchProducts = () =>
  new Promise((resolve, reject) => {
    fetch('../data/data.json')
      .then((response) => {
        console.log(response.ok, response, 'there');
        if (response.ok) return response.json();
        throw new Error('Failed to fetch products');
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// export const fetchProducts = async (): Promise<any[]> => {
//     try {
//         const response = await fetch("/data/data.json");
//         console.log(response.ok, response, 'there');
//         if (!response.ok) {
//             throw new Error("Failed to fetch products from static file");
//         }
//         return await response.json();
//     } catch (error) {
//         throw new Error("Static file retrieval failed: " + error.message);
//     }
// };

// export const fetchProductsFromApi = () =>
//   new Promise((resolve, reject) => {
//     fetch('https://api.example.com/products') // Replace with your API endpoint
//       .then((response) => {
//         if (response.ok) return response.json();
//         throw new Error('Failed to fetch products from API');
//       })
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
//
// export const fetchProductsFromStaticFile = () =>
//   new Promise((resolve, reject) => {
//     fetch('/data/data.json')
//       .then((response) => {
//         if (response.ok) return response.json();
//         throw new Error('Failed to fetch products from static file');
//       })
//       .then((data) => resolve(data))
//       .catch((error) => reject(error));
//   });
//
// export const fetchProducts = () => fetchProductsFromApi().catch(() => fetchProductsFromStaticFile());
