package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductDidYouMean;
import com.atlantbh.internship.AuctionApp.dtos.ProductsPriceDetails;
import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;
import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAll(Pageable pageable, ProductParameters params);

    ProductDidYouMean getAllActiveApproximate(Pageable pageable, ProductParameters params);

    Product getRandom();

    Product getById(Long id) throws ProductNotFoundException;

    Optional<Product> createNewProduct(NewProductRequest request);

    List<Product> createNewProducts(List<NewProductRequest> requests);

    boolean isPurchasable(Product product);

    User getWinner(Product product);

    List<Product> recommendedProducts();

    Page<Product> relatedProducts(long productId, Pageable pageable) throws EntityNotFoundException;

    ProductsPriceDetails getPriceDetails(ProductParameters params, int numberOfBuckets);
}
