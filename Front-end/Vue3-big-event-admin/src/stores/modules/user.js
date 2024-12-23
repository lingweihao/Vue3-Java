import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

// 用户模块 token seToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      console.log(newToken)
      token.value = newToken.data
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      console.log(res.data.data)
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }

    // 记住 el-checkbox 的布尔值
    const rememberCheckbox = ref(false)
    const setRememberCheckbox = (value) => {
      rememberCheckbox.value = value
    }
    const getRememberCheckbox = () => {
      // console.log(rememberCheckbox.value)
      return rememberCheckbox.value
    }

    const rememberPassword = ref('')
    // 记住用户名
    const rememberedUsername = ref('')
    const setRememberedUsername = (username) => {
      rememberedUsername.value = username
    }
    const getRememberedUsername = () => {
      return rememberedUsername.value
    }

    // 记住密码
    const rememberedPassword = ref('')
    const setRememberedPassword = (password) => {
      rememberedPassword.value = password
    }
    const getRememberedPassword = () => {
      return rememberedPassword.value
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      rememberCheckbox,
      setRememberCheckbox,
      getRememberCheckbox,
      rememberPassword,
      rememberedUsername,
      setRememberedUsername,
      getRememberedUsername,
      setRememberedPassword,
      getRememberedPassword
    }
  },
  {
    persist: true
  }
)
