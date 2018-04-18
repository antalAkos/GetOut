package com.codecool.getout.services;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    void addAtraction(Attraction attraction) {

    }


}
