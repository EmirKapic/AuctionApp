package com.atlantbh.internship.AuctionApp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "AppUser")
@SQLDelete(sql = "UPDATE app_user SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;
    @JsonIgnore
    private String password;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "Wishlist", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> wishlist = new ArrayList<>();

    @Nullable
    private String phoneNumber;

    private String role;
    private String address;
    private String city;
    private String zipCode;
    private String country;
    private String creditCard;
    private String photoUrl;
    private Instant dateOfBirth;
    private boolean deleted;
    private String authenticationMethod;

    public User(String email) {
        this(email, null, null, null, null);
    }

    public User(String email, String password, String firstName, String lastName, String authenticationMethod) {
        this(0, firstName, lastName, email, password, null, null, null, authenticationMethod);
    }

    public User(String email, String role, String authenticationMethod) {
        this(0, null, null, email, null, null, null, null, null, null, null, null, null, null, role,
                authenticationMethod, false);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>(List.of(new SimpleGrantedAuthority(getRole())));
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
