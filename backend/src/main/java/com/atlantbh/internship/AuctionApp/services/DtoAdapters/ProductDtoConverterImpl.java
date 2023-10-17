package com.atlantbh.internship.AuctionApp.services.DtoAdapters;

import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.services.Product.ProductDtoConverter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDtoConverterImpl implements ProductDtoConverter {
    @Override
    public Page<ProductDto> convertAllToDto(Page<Product> page){
        List<ProductDto> dtos =  page.getContent().stream()
                .map(this::convertToDto)
                .toList();
        return new PageImpl<>(dtos, PageRequest.of(page.getNumber(), page.getSize()), page.getTotalElements());
    }


    private ProductDto convertToDto(Product product){
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getStartBid(),
                product.getHighestBid(),
                product.getNumberOfBids(),
                product.getDateStart(),
                product.getDateEnd(),
                product.getDateCreated(),
                product.getSubCategory(),
                product.getBids(),
                product.getProductImage(),
                product.getUser().getId()
        );
    }
}
