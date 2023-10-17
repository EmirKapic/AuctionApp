package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.controllers.Products.ProductService;
import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductDtoConverter productDtoConverter;
    @Override
    public Page<ProductDto> getAll(Integer page, Integer size) {
        Page<Product> productsPage =  productRepository.findAll(PageRequest.of(page, size));
        return productDtoConverter.convertAllToDto(productsPage);
    }

    @Override
    public ProductDto getRandomProduct() {
        Long randomPageNumber = getRandomPageNumber();
        Page<Product> randomPage = productRepository.findAll(PageRequest.of(randomPageNumber.intValue(), 20));
        List<ProductDto> productDtos = productDtoConverter.convertAllToDto(randomPage).toList();
        Integer randomIndex = new Random().nextInt(productDtos.size());
        return productDtos.get(randomIndex);
    }

    private Long getRandomPageNumber(){
        Long numberOfRows = productRepository.count();
        Long numberOfPages = numberOfRows/20;
        return new Random().nextLong(numberOfPages);
    }

}
