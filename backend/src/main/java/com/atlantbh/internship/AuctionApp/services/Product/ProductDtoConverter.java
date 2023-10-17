package com.atlantbh.internship.AuctionApp.services.Product;

import com.atlantbh.internship.AuctionApp.dtos.ProductDto;
import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;

public interface ProductDtoConverter {
    Page<ProductDto> convertAllToDto(Page<Product> page);
}
