package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductRecommendationServiceImpl implements ProductRecommendationService{
    private final ProductRepository productRepository;
    private final AuctionUserDetailsService userDetailsService;
    @Override
    public List<Product> recommendedProducts() {
        if (userDetailsService.isAuthenticated()){
            return productRepository.getRecommendedProducts(userDetailsService.getCurrentUser().getId());
        }
        else{
            return productRepository.findTop3ByRandom();
        }

    }
}
