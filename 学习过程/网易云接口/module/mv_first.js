// 最新MV

module.exports = (query, request) => {
    const data = {
        // 'offset': query.offset || 0,
        limit: query.limit || 30,
        total: true
    }
    return request(
        'POST', `http://music.163.com/weapi/mv/first`, data,
        {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
    )
}