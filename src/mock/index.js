import Mock from 'mockjs'

Mock.mock('/login', (req, res) => {
    return {
        msg: 'success'
    }
})