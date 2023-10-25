package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    @Override
    public Page<Product> getAllActive(Pageable pageable) {
        return productRepository.findAllByDateEndAfterAndDateStartBefore(pageable, Instant.now(), Instant.now());
    }

    @Override
    public Product getRandom() {
        return productRepository.getRandom();
    }

}
