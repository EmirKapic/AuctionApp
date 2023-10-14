package com.atlantbh.internship.AuctionApp.services;

import com.atlantbh.internship.AuctionApp.controllers.ProductService;
import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    @Override
    public Page<ProductDto> getAll(Integer page, Integer size) {
        Page<Product> productsPage =  productRepository.findAll(PageRequest.of(page, size));
        List<ProductDto> prodDtos = productsPage.getContent().stream()
                .map(this::convertToDto)
                .toList();
        return new PageImpl<>(prodDtos, PageRequest.of(productsPage.getNumber(), productsPage.getSize()), productsPage.getTotalElements());
    }

    private ProductDto convertToDto(Product product){
        return new ProductDto(
                product.getId(),
                product.getStartBid(),
                product.getHighestBid(),
                product.getNumberOfBids(),
                product.getDateStart(),
                product.getDateEnd(),
                product.getDateCreated(),
                product.getSubCategory(),
                product.getBids(),
                product.getProductImage()
        );
    }
}
