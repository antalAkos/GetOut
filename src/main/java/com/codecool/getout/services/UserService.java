package com.codecool.getout.services;

import com.codecool.getout.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
