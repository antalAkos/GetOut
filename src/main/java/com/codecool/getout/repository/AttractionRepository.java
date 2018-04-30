package com.codecool.getout.repository;

import com.codecool.getout.model.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {

}
