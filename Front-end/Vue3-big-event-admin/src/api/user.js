import request from '@/utils/request'

// 注册接口
export const userRegisterService = (registerData) => {
  const params = new URLSearchParams()
  for (let key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}

// 登录接口
export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (let key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

// 获取用户基本信息
export const userGetInfoService = () => {
  return request.get('/user/userInfo')
}

// 更新用户基本信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/user/update', { id, nickname, email })

// 更新用户头像
export const userUpdateAvatarService = (avatarUrl) => {
  const params = new URLSearchParams()
  params.append('avatarUrl', avatarUrl)
  return request.patch('/user/updateAvatar', params)
}

// 更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/user/updatePwd', { old_pwd, new_pwd, re_pwd })
