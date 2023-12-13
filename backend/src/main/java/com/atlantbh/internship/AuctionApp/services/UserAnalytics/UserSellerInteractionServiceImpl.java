package com.atlantbh.internship.AuctionApp.services.UserAnalytics;

import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.models.UserSellerInteraction;
import com.atlantbh.internship.AuctionApp.repositories.SellerInteractionRepository;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSellerInteractionServiceImpl implements UserSellerInteractionService{
    private final AuctionUserDetailsService userDetailsService;
    private final SellerInteractionRepository interactionRepository;
    @Override
    public UserSellerInteraction createOrAdd(String sellerEmail) {
        User user = userDetailsService.getCurrentUser();
        User seller = userDetailsService.loadUserByUsername(sellerEmail);

        List<UserSellerInteraction> userInteractions =
                interactionRepository.findAllBySeller_IdAndUser_Id(seller.getId(), user.getId());

        if (userInteractions.isEmpty()){
            return interactionRepository.save(new UserSellerInteraction(user, seller));
        }
        else{
            return addInteraction(userInteractions.get(0));
        }
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
