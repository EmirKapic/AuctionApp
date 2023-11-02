package com.atlantbh.internship.AuctionApp.dtoconvertors;

public interface DtoConverter <Dto, Model>{
    Dto convertToDto(Model m);
}
