package com.itheima.controller;

import com.itheima.pojo.Category;
import com.itheima.pojo.Result;
import com.itheima.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  //表示这个类是一个控制器，并且该类的所有方法返回的数据都直接写入 HTTP 响应体中
@RequestMapping("/category") //指定了该控制器处理的请求路径的根路径为 "/category"
public class CategoryController {
    @Autowired  //自动装配 CategoryService 类型的 Bean，即将该属性注入到当前类中
    private CategoryService categoryService;

    @PostMapping  //表示处理 HTTP POST 请求的方法
    //@RequestBody 用于绑定 HTTP 请求的正文部分（body）到方法的参数上，这里是将请求体中的 JSON 数据映射到 category 参数上。
    // @Validated(Category.Add.class) 是用于启用参数校验，限定只校验 Category.Add 分组的验证规则。
    // categoryService.add(category) 调用服务类的添加方法，然后返回一个成功的结果。
    public Result add(@RequestBody @Validated(Category.Add.class) Category category) {
        categoryService.add(category);
        return Result.success();
    }

    @GetMapping
    public Result<List<Category>> list() {
        List<Category> cs = categoryService.list();
        return Result.success(cs);
    }

    @GetMapping("/detail")
    public Result<Category> detail(Integer id) {
        Category c = categoryService.findById(id);
        return Result.success(c);
    }

    //更新文章分类
    @PutMapping
    public Result update(@RequestBody @Validated(Category.Update.class) Category category){
        categoryService.update(category);
        return Result.success();
    }

    @DeleteMapping
    public Result delete(Integer id){
        categoryService.delete(id);
        return Result.success();
    }
}
