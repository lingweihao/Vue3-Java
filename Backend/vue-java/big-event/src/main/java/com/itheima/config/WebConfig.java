package com.itheima.config;

import com.itheima.interceptors.Loginlnterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private Loginlnterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        // 登录接口和注册接口不拦截
        registry.addInterceptor(loginInterceptor).excludePathPatterns("/user/login","/user/register");
    }
}
