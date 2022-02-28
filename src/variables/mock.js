import { v4 as uuid } from 'uuid';

const sellerMockDatas = [
    {
        seller_code: uuid(),
        seller_name: 'Toko ABC',
        address: 'Cilandak, Jakarta Selatan, DKI Jakarta',
        avatarUrl: 'https://via.placeholder.com/150',
        products: [
            {
                id: Date.now(),
                name: 'Indomie Goreng',
                price: 2500,
                stock: 10,
            },
            {
                id: Date.now(),
                name: 'Indomie Rebus',
                price: 2200,
                stock: 15,
            },
            {
                id: Date.now(),
                name: 'Kopi ABC',
                price: 3000,
                stock: 20,
            },
            {
                id: Date.now(),
                name: 'Kopi Kapal Api',
                price: 2000,
                stock: 60,
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
                id: Date.now(),
                name: 'Indomie Goreng',
                price: 2500,
                stock: 10,
            },
            {
                id: Date.now(),
                name: 'Indomie Rebus',
                price: 2200,
                stock: 15,
            },
            {
                id: Date.now(),
                name: 'Kopi ABC',
                price: 3000,
                stock: 20,
            },
            {
                id: Date.now(),
                name: 'Kopi Kapal Api',
                price: 2000,
                stock: 60,
            },
        ]
    },
];

export default sellerMockDatas;