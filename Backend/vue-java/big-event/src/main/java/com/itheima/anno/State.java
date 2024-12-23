package com.itheima.anno;

import com.itheima.validation.StateValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

import static java.lang.annotation.ElementType.*;

@Documented//元注解：用来表示下面的State可以抽取到帮助文档里边
@Target({FIELD})//也是一个元注解，用来标识State可以用在哪些地方(类、属性、方法...)
@Retention(RetentionPolicy.RUNTIME)//以实元注解，用来标识State会在哪个阶段会被保留(编译阶段还是源码阶段还是运行时阶段)
@Constraint(validatedBy = { StateValidation.class})//指定提供校验规则的类
public @interface State {

    //message:用来提供校验失败后的信息
    String message() default "state参数的值只能是已发布或者草稿";
    //指定分组
    Class<?>[] groups() default {};
    //负载 获取到State注解的附加信息
    Class<? extends Payload>[] payload() default {};
}
