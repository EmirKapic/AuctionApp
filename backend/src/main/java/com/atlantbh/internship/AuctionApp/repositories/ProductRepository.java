package com.atlantbh.internship.AuctionApp.repositories;

import com.atlantbh.internship.AuctionApp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "FROM Product where dateStart < current date and dateEnd > current date and user.email <> :userEmail ORDER BY RANDOM() LIMIT 1")
    Product getRandom(String userEmail);

    @Query("""
            from Product where (:categoryId is null or :categoryId = subCategory.category.id )
            and (:subcategoryId is null or :subcategoryId = subCategory.id)
            and (:name is null or name ilike concat('%', :name, '%'))
            and (:sellerId is null or user.id = :sellerId)
            and (:excludedSeller is null or user.email <> :excludedSeller)
            and
                case
                    when :active is null then true
                    when :active = true AND dateEnd > current date then true
                    when :active = false AND dateEnd < current date then true
                    else false
                end
            """)
    Page<Product> getAll(Pageable pageable,
            @Param("categoryId") Long categoryId,
            @Param("subcategoryId") Long subcategoryId,
            @Param("name") String name,
            @Param("sellerId") Long sellerId,
            @Param("active") Boolean active,
            @Param("excludedSeller") String excludedSeller);

    @Query("""
            from Product where (:categoryId is null or :categoryId = subCategory.category.id )
            and (:subcategoryId is null or :subcategoryId = subCategory.id)
            and (:name is null or levenshtein(upper(name),upper(:name)) <= 3)
            and (dateStart < current date and dateEnd > current date)
            order by levenshtein(upper(name), upper(:name))""")
    Page<Product> getAllActiveApproximate(Pageable pageable,
            @Param("categoryId") Long categoryId,
            @Param("subcategoryId") Long subcategoryId,
            @Param("name") String name);
}
