export const addSeller = data => {
    return ({
        type: "SELLER_ADD",
        payload: data,
    })
}

export const delSeller = data => {
    return ({
        type: "SELLER_DEL_BY_ID",
        payload: data,
    })
}

export const updateSeller = data => {
    return({
        type: "SELLER_UPDATE_BY_ID",
        payload: data,
    })
}

export const addProduct = data => {
    return ({
        type: "PRODUCT_ADD",
        payload: data,
    })
}

export const delProduct = data => {
    return ({
        type: "PRODUCT_DELETE_BY_ID",
        payload: data,
    })
}

export const updateProduct = data => {
    return ({
        type: "PRODUCT_UPDATE_BY_ID",
        payload: data,
    })
}