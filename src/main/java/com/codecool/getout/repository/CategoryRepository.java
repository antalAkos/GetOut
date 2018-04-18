package com.codecool.getout.repository;

import com.codecool.getout.model.Attraction;
import com.codecool.getout.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    void addAttraction(Attraction attraction);
}
