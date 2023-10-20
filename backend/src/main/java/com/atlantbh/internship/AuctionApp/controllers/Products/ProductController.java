package com.atlantbh.internship.AuctionApp.controllers.Products;


import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.services.Product.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/products")
@CrossOrigin
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping
    public Page<Product> getProducts(Pageable pageable){
        return productService.getAll(pageable);
    }

    @GetMapping("/random")
    public Product getRandom(){
        return productService.getRandom();
    }



}
