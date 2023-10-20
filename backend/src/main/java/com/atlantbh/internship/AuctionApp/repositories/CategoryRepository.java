package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
