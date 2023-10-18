package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getRandom() {
        return productRepository.findRandom();
    }

    @Override
    public Page<Product> getRecent(Pageable pageable) {
        return productRepository.findAllByOrderByDateStartDesc(pageable);
    }

}
