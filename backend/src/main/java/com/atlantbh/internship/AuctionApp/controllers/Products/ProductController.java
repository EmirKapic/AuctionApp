package com.atlantbh.internship.AuctionApp.controllers.Products;

import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.ProductDidYouMean;
import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.services.Product.ProductParameters;
import com.atlantbh.internship.AuctionApp.services.Product.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/products")
@AllArgsConstructor
public class ProductController {
    private ProductService productService;

    @GetMapping
    public Page<Product> getAll(final Pageable pageable, final ProductParameters parameters) {
        return productService.getAll(pageable, parameters);
    }

    @GetMapping("/search")
    public ProductDidYouMean getAllActiveApproximate(final Pageable pageable,
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

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity makeNewProduct(@RequestBody NewProductRequest request) {
        Optional<Product> insertedProduct = productService.createNewProduct(request);
        if (insertedProduct.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Could not create your auction."));
        }
        return ResponseEntity.ok().body(insertedProduct.get());
    }

}
