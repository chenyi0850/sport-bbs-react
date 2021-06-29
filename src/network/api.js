import service from ".";

export const getArticleList = data => service.get('/getArticleList', { params: data })

export const getArticleDetail = data => service.post('/getArticleDetail', data)

export const login = data => service.post('/login', data)

export const addComment = data => service.post('/addComment', data,  {withCredentials: true})