package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.exceptions.SubcategoryNotFoundException;
import com.atlantbh.internship.AuctionApp.models.SubCategory;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryInteractionRepository;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSubcategoryInteractionServiceImpl implements UserSubcategoryInteractionService{
    private final SubcategoryInteractionRepository interactionRepository;
    private final AuctionUserDetailsService userDetailsService;
    private final SubcategoryRepository subcategoryRepository;
    @Override
    public UserSubcategoryInteraction createOrAdd(long subcategoryId) throws SubcategoryNotFoundException {
        User user = userDetailsService.getCurrentUser();
        Optional<SubCategory> subCategory = subcategoryRepository.findById(subcategoryId);
        if (subCategory.isEmpty()){
            throw new SubcategoryNotFoundException("Subcategory with id: " + subcategoryId + "doesn't exist.");
        }

        Optional<UserSubcategoryInteraction> userInteraction =
                interactionRepository.findBySubCategory_IdAndUser_Id(subcategoryId, user.getId());

        return userInteraction.map(this::addInteraction)
                .orElseGet(() -> interactionRepository.save(new UserSubcategoryInteraction(user, subCategory.get())));
    }

    private UserSubcategoryInteraction addInteraction(UserSubcategoryInteraction interaction){
        interaction.setViews(interaction.getViews() + 1);
        if (interaction.getInteractedWithCounter() == 9){
            interaction.setInteractedWithCounter(0);
            interaction.setLastInteractedWith(Instant.now());
        }
        else{
            interaction.setInteractedWithCounter(interaction.getInteractedWithCounter() + 1);
        }
        return interactionRepository.save(interaction);
    }
}
