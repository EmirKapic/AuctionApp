package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.models.UserSellerInteraction;
import com.atlantbh.internship.AuctionApp.repositories.SellerInteractionRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSellerInteractionServiceImpl implements UserSellerInteractionService{
    private final AuctionUserDetailsService userDetailsService;
    private final SellerInteractionRepository interactionRepository;
    @Override
    @Transactional
    public UserSellerInteraction createOrAdd(String sellerEmail) {
        User user = userDetailsService.getCurrentUser();
        User seller = userDetailsService.loadUserByUsername(sellerEmail);

        Optional<UserSellerInteraction> userInteractions =
                interactionRepository.findBySeller_IdAndUser_Id(seller.getId(), user.getId());

        return userInteractions.map(this::addInteraction)
                .orElseGet(() -> interactionRepository.save(new UserSellerInteraction(user, seller)));
    }

    private UserSellerInteraction addInteraction(UserSellerInteraction interaction){
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
