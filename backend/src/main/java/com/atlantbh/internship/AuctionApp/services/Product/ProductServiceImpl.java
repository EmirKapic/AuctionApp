package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductDidYouMean;
import com.atlantbh.internship.AuctionApp.dtos.ProductsPriceDetails;
import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;
import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.*;
import com.atlantbh.internship.AuctionApp.projections.MaxMinPrice;
import com.atlantbh.internship.AuctionApp.projections.ProductBucket;
import com.atlantbh.internship.AuctionApp.repositories.BidRepository;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import com.atlantbh.internship.AuctionApp.utilities.ProductValidator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private SubcategoryRepository subcategoryRepository;
    private AuctionUserDetailsService userDetailsService;
    private final BidRepository bidRepository;

    @Override
    public Page<Product> getAll(Pageable pageable, ProductParameters params) {
        return productRepository.getAll(pageable, params.categoryId(), params.subcategoryIds(), params.name(),
                params.sellerId(), params.active(), excludeOwnedBy(params.excludeUserOwned()), params.minPrice(),
                params.maxPrice());
    }

    @Override
    public ProductDidYouMean getAllActiveApproximate(Pageable pageable, ProductParameters params) {
        Page<Product> products = productRepository.getAll(pageable, params.categoryId(), params.subcategoryIds(),
                params.name(), params.sellerId(), true, excludeOwnedBy(params.excludeUserOwned()), params.minPrice(), params.maxPrice());
        if (!products.isEmpty() || params.name() == null) {
            return new ProductDidYouMean(products, null);
        }
        Page<Product> aprox = productRepository.getAllActiveApproximate(pageable, params.categoryId(),
                params.subcategoryIds(), params.name());
        String didYouMeanQuery = aprox.isEmpty() ? null : aprox.getContent().get(0).getName();
        return new ProductDidYouMean(aprox, didYouMeanQuery);
    }

    @Override
    public Product getRandom() {
        return productRepository.getRandom(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @Override
    public Product getById(Long id) throws ProductNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id: " + id + " does not exist"));
    }

    @Override
    public Optional<Product> createNewProduct(NewProductRequest request) {
        if (!ProductValidator.validate(request)) {
            return Optional.empty();
        }
        Optional<SubCategory> subCategory = subcategoryRepository.findByNameEqualsIgnoreCase(request.subcategoryName());
        if (subCategory.isEmpty()) {
            return Optional.empty();
        }
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userDetailsService.loadUserByUsername(currentUserEmail);

        Product newProduct = new Product(request.title(), request.description(), request.startPrice(),
                request.startDate(),
                request.endDate(), request.address(), request.city(), request.zipCode(), request.country(),
                request.phoneNumber(), subCategory.get(), user);
        newProduct.setImages(request.imageUrls().stream().map(url -> new ProductImage(url, newProduct)).toList());

        return Optional.of(productRepository.save(newProduct));
    }

    @Override
    public List<Product> createNewProducts(List<NewProductRequest> requests) {
        return requests.stream()
                .map(this::createNewProduct)
                .flatMap(Optional::stream)
                .toList();
    }

    private String excludeOwnedBy(Boolean excludeUserOwned) {
        if (excludeUserOwned == null || !excludeUserOwned)
            return null;
        else
            return userDetailsService.getCurrentUserEmail();
    }

    @Override
    public boolean isPurchasable(Product product) {
        return product != null && !product.isPurchased() && product.getDateEnd().isBefore(Instant.now());
    }

    @Override
    public User getWinner(Product product) {
        Bid bid = bidRepository.findFirstByProduct_IdOrderByBidDesc(product.getId()).get();
        return bid.getBidder();
    }

    @Override
    public List<Product> recommendedProducts() {
        if (userDetailsService.isAuthenticated()) {
            List<Product> recommendedProducts = productRepository
                    .getRecommendedProducts(userDetailsService.getCurrentUser().getId());
            return recommendedProducts.size() == 3 ? recommendedProducts
                    : productRepository.findTop3ByRandom(userDetailsService.getCurrentUserEmail());
        } else
            return productRepository.findTop3ByRandom(userDetailsService.getCurrentUserEmail());
    }

    @Override
    public Page<Product> relatedProducts(long productId, Pageable pageable) throws EntityNotFoundException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No product with id " + productId + " found"));

        return productRepository
                .findRelatedProducts(
                        userDetailsService.getCurrentUserEmail(),
                        product.getSubCategory().getId(),
                        product.getSubCategory().getCategory().getId(),
                        productId,
                        pageable);
    }

    @Override
    public ProductsPriceDetails getPriceDetails(ProductParameters params, int numberOfBuckets) {
        MaxMinPrice maxMin = productRepository.getMaxMinPrice(params.categoryId(), params.subcategoryIds(),
                params.name(),
                params.sellerId(), params.active(), excludeOwnedBy(true), params.minPrice(), params.maxPrice());
        Double diff = maxMin.getMax() - maxMin.getMin();

        List<ProductBucket> result = productRepository.getProductBuckets(diff, maxMin.getMin(), numberOfBuckets,
                params.categoryId(),
                params.subcategoryIds() != null ? params.subcategoryIds() : List.of(), params.name(),
                params.sellerId(), params.active(), excludeOwnedBy(true), params.minPrice(), params.maxPrice());

        return new ProductsPriceDetails(result, maxMin.getMax(), maxMin.getMin());
    }

}
