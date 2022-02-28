import { v4 as uuid } from 'uuid';

const initialState = {
  sellers: [
    {
      seller_code: uuid(),
      seller_name: 'Toko ABC',
      address: 'Cilandak, Jakarta Selatan, DKI Jakarta',
      avatarUrl: 'https://via.placeholder.com/150',
      products: [
        {
          id: uuid(),
          name: 'Indomie Goreng',
          price: 2500,
          stock: 10,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: uuid(),
          name: 'Indomie Rebus',
          price: 2200,
          stock: 15,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: uuid(),
          name: 'Kopi ABC',
          price: 3000,
          stock: 20,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {   
          id: uuid(),
          name: 'Kopi Kapal Api',
          price: 2000,
          stock: 60,
          productImageUrl: 'https://via.placeholder.com/150',
        },
      ]
    },
    {
      seller_code: uuid(),
      seller_name: 'Toko Simpang',
      address: 'Pasar Minggu, Jakarta Selatan, DKI Jakarta',
      avatarUrl: 'https://via.placeholder.com/150',
      products: [
        {
          id: uuid(),
          name: 'Indomie Goreng',
          price: 2500,
          stock: 10,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: uuid(),
          name: 'Indomie Rebus',
          price: 2200,
          stock: 15,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: uuid(),
          name: 'Kopi ABC',
          price: 3000,
          stock: 20,
          productImageUrl: 'https://via.placeholder.com/150',
        },
        {
          id: uuid(),
          name: 'Kopi Kapal Api',
          price: 2000,
          stock: 60,
          productImageUrl: 'https://via.placeholder.com/150',
        },
      ]
    },
  ]
}

const sellerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SELLER_ADD" :
      return {
        ...state,
        sellers: [...state.sellers, payload]
      }
    case "SELLER_DEL_BY_ID":
      return{
        ...state,
        sellers: state.sellers.filter(seller => seller.seller_code !== payload)
      }
    case "SELLER_UPDATE_BY_ID": {
        const index = state.sellers.findIndex(seller => seller.seller_code === payload.seller_code)
        const newArray = [...state.sellers]
        newArray[index].seller_name = payload.seller_name
        newArray[index].address = payload.address
        return {
            ...state,
            sellers: newArray
        }
    }
    case "PRODUCT_ADD": {
        const index = state.sellers.findIndex(seller => seller.seller_code === payload.seller_code)
        const newArray = [...state.sellers]
        const oldProducts = state.sellers[index].products;
        newArray[index].products = [...oldProducts, payload.products]
        return {
            ...state,
            sellers: newArray
        }
    }
    case "PRODUCT_DELETE_BY_ID": {
        const index = state.sellers.findIndex(seller => seller.seller_code === payload.seller_code)
        const newArray = [...state.sellers]
        const products = newArray[index].products.filter((product) => product.id !== payload.product_id)
        newArray[index].products = products;
        return {
            ...state,
            sellers: newArray
        }
    }
    case "PRODUCT_UPDATE_BY_ID": {
        const index = state.sellers.findIndex(seller => seller.seller_code === payload.seller_code)
        const newArray = [...state.sellers]
        const indexProduct = state.sellers[index].products.findIndex(product => product.id === payload.products.id)
        newArray[index].products[indexProduct].name = payload.products.name
        newArray[index].products[indexProduct].price = payload.products.price
        newArray[index].products[indexProduct].stock = payload.products.stock
        return {
            ...state,
            sellers: newArray
        }
    }
    default:
        return {
            ...state
        }
  }
}

export default sellerReducer;