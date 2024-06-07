import api from './axiosConfig';

const headersApplication = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

// auth
export async function loginReq(data) {
    const res = await api.post(`login`, data);

    return res.data;
}

export async function registerReq(data) {
    const res = await api.post(`register`, data);

    return res.data;
}

export async function refreshReq() {
    const res = await api.post(`refresh`);

    return res.data;
}

// logout && login details
export async function authDetailsReq() {
    const res = await api.get(`auth_details`);

    return res.data;
}

export async function logoutReq() {
    const res = await api.post(`logout`);

    return res.data;
}

// banks
export async function banksListReq(page, signal) {
    const res = await api.get(
        `banks`,
        {
            params: {
                page,
            },
        },
        signal
    );

    return res.data;
}

export async function banksListSearchReq(searchQuery, signal) {
    const res = await api.get(`banks?${searchQuery}`, signal);

    return res.data;
}

export async function singleBankReq(id) {
    const res = await api.get(`banks/${id}`);

    return res.data;
}

export async function createBankReq(data) {
    const res = await api.post(`banks`, data);

    return res.data;
}

export async function updateBankReq(id, data) {
    const res = await api.put(
        `banks/${id}`,
        data,
        headersApplication
    );

    return res.data;
}

export async function deleteBankReq(id) {
    const res = await api.delete(`banks/${id}`);

    return res.data;
}

// tags
export async function tagsListReq(page, signal) {
    const res = await api.get(
        `tags`,
        {
            params: {
                page,
            },
        },
        signal
    );

    return res.data;
}

export async function tagsListSearchReq(searchQuery, signal) {
    const res = await api.get(`tags?${searchQuery}`, signal);

    return res.data;
}

export async function singleTagReq(id) {
    const res = await api.get(`tags/${id}`);

    return res.data;
}

export async function createTagReq(data) {
    const res = await api.post(`tags`, data);

    return res.data;
}

export async function updateTagReq(id, data) {
    const res = await api.put(
        `tags/${id}`,
        data,
        headersApplication
    );

    return res.data;
}

export async function deleteTagReq(id) {
    const res = await api.delete(`tags/${id}`);

    return res.data;
}

// transactions
export async function transactionsListReq(page, signal) {
    const res = await api.get(
        `transactions`,
        {
            params: {
                page,
            },
        },
        signal
    );

    return res.data;
}

export async function transactionsListSearchReq(searchQuery, signal) {
    const res = await api.get(`transactions?${searchQuery}`, signal);

    return res.data;
}

export async function singleTransactionReq(id) {
    const res = await api.get(`transactions/${id}`);

    return res.data;
}

export async function createTransactionReq(data) {
    const res = await api.post(`transactions`, data);

    return res.data;
}

export async function updateTransactionReq(id, data) {
    const res = await api.put(
        `transactions/${id}`,
        data,
        headersApplication
    );

    return res.data;
}

export async function deleteTransactionReq(id) {
    const res = await api.delete(`transactions/${id}`);

    return res.data;
}

// user 
export async function usersListReq(page, signal) {
    const res = await api.get(
        `users`,
        {
            params: {
                page,
            },
        },
        signal
    );

    return res.data;
}