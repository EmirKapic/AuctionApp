package com.atlantbh.internship.AuctionApp.controllers.Products;


import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/products")
@CrossOrigin
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping
    public Page<ProductDto> getProducts(@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
                                        @RequestParam(name = "pageSize", required = false, defaultValue = "20") Integer pageSize){
        return productService.getAll(page, pageSize);
    }

}
