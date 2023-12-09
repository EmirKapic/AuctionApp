package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductDidYouMean;
import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.ProductImage;
import com.atlantbh.internship.AuctionApp.models.SubCategory;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import com.atlantbh.internship.AuctionApp.utilities.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private SubcategoryRepository subcategoryRepository;
    private AuctionUserDetailsService userDetailsService;

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

    @Override
    public Optional<Product> createNewProduct(NewProductRequest request) {

        if (!EmailValidator.validate(request.email())){
            return Optional.empty();
        }

        Optional<SubCategory> subCategory = subcategoryRepository.findById(request.subcategoryId());
        if (subCategory.isEmpty()){
            return Optional.empty();
        }

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userDetailsService.loadUserByUsername(currentUserEmail);

        Product newProduct = new Product(request.title(), request.description(), request.startPrice(), request.startDate(),
                request.endDate(), request.address(), request.email(), request.city(), request.zipCode(), request.country(),
                request.phoneNumber(), subCategory.get(), user);
        newProduct.setImages(request.imageUrls().stream().map(url -> new ProductImage(url, newProduct)).toList());

        return Optional.of(productRepository.save(newProduct));
    }

}
