package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductDidYouMean;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
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
    public Page<Product> getAll(Pageable pageable, ProductParameters params) {
        return productRepository.getAll(pageable, params.categoryId(), params.subcategoryId(), params.name(),
                params.sellerId(), params.active());
    }

    @Override
    public ProductDidYouMean getAllActiveApproximate(Pageable pageable, ProductParameters params) {
        Page<Product> products = productRepository.getAll(pageable, params.categoryId(), params.subcategoryId(),
                params.name(), params.sellerId(), params.active());
        if (!products.isEmpty()) {
            return new ProductDidYouMean(products, null);
        }
        Page<Product> aprox = productRepository.getAllActiveApproximate(pageable, params.categoryId(),
                params.subcategoryId(), params.name());
        String didYouMeanQuery = aprox.isEmpty() ? null : aprox.getContent().get(0).getName();
        return new ProductDidYouMean(aprox, didYouMeanQuery);
    }

    @Override
    public Product getRandom() {
        return productRepository.getRandom();
    }

    @Override
    public Product getById(Long id) throws ProductNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id: " + id + " does not exist"));
    }

}
