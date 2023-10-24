package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public Page<Product> getAllActive(Pageable pageable, ProductParameters params) {
        if (params == null){
            params = new ProductParameters(null, null);
        }
        return productRepository.getAllActive(pageable, params.categoryId(), params.subcategoryId());
    }

    @Override
    public Product getRandom() {
        return productRepository.getRandom();
    }

    @Override
    public Product getById(Long id) throws ProductNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new ProductNotFoundException("No product with such id found");
        }
    }


}
