package com.example.demo.security;

import com.example.demo.UserRepository;
import com.example.demo.models.User;
import com.example.demo.models.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        if (user != null) {
            UserPrincipal userPrincipal = new UserPrincipal(user);
            return userPrincipal;
        }
        throw new UsernameNotFoundException("nie ma takiego użytkownika");
    }
}
