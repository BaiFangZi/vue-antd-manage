import request from '@/utils/http'

// export

export const login = (data) => request({
    url: '/login',
    method: 'post',
    data
})