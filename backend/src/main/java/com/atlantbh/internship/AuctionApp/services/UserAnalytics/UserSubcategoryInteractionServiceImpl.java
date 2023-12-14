package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.exceptions.EntityNotFoundException;
import com.atlantbh.internship.AuctionApp.models.SubCategory;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.models.UserSubcategoryInteraction;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryInteractionRepository;
import com.atlantbh.internship.AuctionApp.repositories.SubcategoryRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import jakarta.transaction.Transactional;
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
    @Transactional
    public UserSubcategoryInteraction createOrAdd(long subcategoryId) throws EntityNotFoundException {
        User user = userDetailsService.getCurrentUser();
        Optional<SubCategory> subCategory = subcategoryRepository.findById(subcategoryId);
        if (subCategory.isEmpty()){
            throw new EntityNotFoundException("Subcategory with id: " + subcategoryId + "doesn't exist.");
        }

        Optional<UserSubcategoryInteraction> userInteractions =
                interactionRepository.findBySubCategory_IdAndUser_Id(subcategoryId, user.getId());

        return userInteractions.map(this::addInteraction)
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
