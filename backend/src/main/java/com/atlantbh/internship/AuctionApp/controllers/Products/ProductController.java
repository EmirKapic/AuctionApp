package com.atlantbh.internship.AuctionApp.controllers.Products;

import com.atlantbh.internship.AuctionApp.dtos.ProductsApproximate;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.services.Product.ProductParameters;
import com.atlantbh.internship.AuctionApp.services.Product.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/products")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping
    public Page<Product> getAllActive(final Pageable pageable, final ProductParameters parameters) {
        return productService.getAllActive(pageable, parameters);
    }

    @GetMapping("/search")
    public ProductsApproximate getAllActiveApproximate(final Pageable pageable,
            final ProductParameters parameters) {
        return productService.getAllActiveApproximate(pageable, parameters);
    }

    @GetMapping("/random")
    public Product getRandom() {
        return productService.getRandom();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable(name = "id") Long id) throws ProductNotFoundException {
        return productService.getById(id);
    }

}
